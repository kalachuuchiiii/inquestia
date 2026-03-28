import { EntityHelper } from "@/helper";
import { AnswerHelper } from "@/helper/answer.helper";
import { UserModel } from "@/models";
import Answer, { AnswerMethods, AnswerModel } from "@/models/answer/answer";
import Survey, { SurveyMethods } from "@/models/survey/survey";
import User from "@/models/user/user";
import {
  BadRequestError,
  NotFoundError,
} from "@/utils/customErrorClass";
import { getNextPage } from "@/utils/getNextPage";
import { runWithSession } from "@/utils/runWithSession";
import { AnswerFilterSchema, AnswerFormSchema, QueryParam } from "@inquestia/schemas";
import { AnswerDTO, UserDTO } from "@inquestia/types";
import mongoose, { HydratedDocument } from "mongoose";
import { isReturnStatement } from "typescript";
import z from "zod";

const entityHelper = new EntityHelper<AnswerModel>(Answer);
const answerHelper = new AnswerHelper();

export class AnswerService {
  getSurveyAnswers = async ({
    myId,
    skip,
    limit,
    page,
    filterForm
  }: { myId: string; filterForm: z.infer<typeof AnswerFilterSchema> } & Omit<QueryParam, "sort"> ) => {


    const pipeline = [
  ...answerHelper.generateAnswerFilterPipeline(filterForm),
  {
    $lookup: {
      from: "users",
      localField: "respondentId",
      foreignField: "_id",
      as: "respondent"
    }
  },
  {
    $lookup: {
      from: "surveys",
      localField: "surveyId",
      foreignField: "_id",
      as: "survey"
    }
  },
  { $unwind: { path: "$respondent", } },
  { $unwind: { path: "$survey" } },
  // <-- New lookup for survey.authorId
  {
    $lookup: {
      from: "users",
      localField: "survey.authorId",
      foreignField: "_id",
      as: "survey.author"
    }
  },
  { $unwind: { path: "$survey.author" } }
];

    const [answers, totalAnswers] = await Promise.all([
      Answer.aggregate(pipeline)
        .skip(skip)
        .limit(limit)
        .exec(),
      Answer.aggregate(pipeline).count("total").exec(),
    ]);
    const nextPage = getNextPage({ page, limit, totalResources: totalAnswers[0]?.total || 0 });
    return {
      answers: answers.map((ans) => answerHelper.reformatSurveyAnswer(ans)),
      totalAnswers,
      nextPage
    }
    
  };

  getMyAnswers = async ({
    myId,
    skip,
    page,
    limit,
  }: { myId: string } & Omit<QueryParam, "sort">) => {
    const query = {
      respondentId: myId,
    };

    const [answers, totalAnswers] = await Promise.all([
      Answer.find(query)
        .skip(skip)
        .limit(limit)
        .populate({
          path: "surveyId",
          model: "Survey",
          select: "questions title description _id authorId",
          options: { lean: true },
          populate: {
            path: "authorId",
            model: "User",
            select: "avatar username nickname _id",
          },
        })
        .lean<
          {
            surveyId: AnswerDTO["survey"] & { authorId: UserDTO };
          }[]
        >(),
      Answer.countDocuments(query), //client will provide the user for respondent field, no populate needed
    ]);

    const safeAnswers = answers.map((a) => ({
      ...new Answer(a).getSafeDetails(),
      survey: {
        ...a.surveyId,
        authorId: a.surveyId.authorId._id,
        author: a.surveyId.authorId,
      },
    }));
    const nextPage = getNextPage({ page, limit, totalResources: totalAnswers });
    return {
      answers: safeAnswers.map((ans) => answerHelper.reformatSurveyAnswer({...ans})),
      totalAnswers,
      nextPage,
    };
  };

  submitAnswer = async ({
    myId,
    surveyId,
    answerForm,
  }: {
    myId: string;
    surveyId: string;
    answerForm: z.infer<typeof AnswerFormSchema>;
  }) => {
    const survey = await Survey.findOne({
      _id: surveyId,
      isClosed: false,
      isDeleted: false,
      isTakendown: false,
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));

    if(survey.respondents.map(r => r.toString()).includes(myId)){
      throw new BadRequestError("You have already submitted an answer to this survey.", "ANSWER_ALREADY_SUBMITTED");
    }

 
    const [author, respondent] = await Promise.all([
      User.findById(survey.authorId).orFail(new NotFoundError("Author not found.", "AUTHOR_NOT_FOUND")),
      User.findById(myId).orFail(new NotFoundError("User not found.", "USER_NOT_FOUND")),
    ]);

    answerHelper.validateAnswerForm({ myId, survey, answerForm }); //checks for respondent conflicts, and required questions, isClosed, isDeleted, isTakendown, measures

    return await runWithSession(async(session) => {
      survey.respondents.push(new mongoose.Types.ObjectId(myId));
      
      // Increment points for author (survey creator)
      if(author.core){
        author.core.current += 50;
        author.core.highest = Math.max(author.core.highest, author.core.current);
        await author.save({ session });
      }

  
      if(!answerForm.isAnonymous && respondent.core){
        respondent.core.current += 50;
        respondent.core.highest = Math.max(respondent.core.highest, respondent.core.current);
        await respondent.save({ session });
      }

      await survey.save({ session });
      
      await new Answer({
        ...answerForm,
        respondentId: answerForm.isAnonymous ? null : myId,
        surveyId,
      }).save({session });
    });
  };

  toggleIsAuthentic = async ({
    answerId,
    myId
  }: {
    answerId: string;
    myId: string;
  }) => {
   
    const answer = await Answer.findById(answerId).orFail(new NotFoundError("Answer not found.", "ANSWER_NOT_FOUND"));
    await Survey.exists({ _id: answer.surveyId, $or: [{
      authorId: myId
    }, {
      authorizedViewers: [myId]
    }] }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));

    await answer.updateOne({ isAuthentic: !answer.isAuthentic });
    return !answer.isAuthentic;
  };
}
