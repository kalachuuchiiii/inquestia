import { SurveyModel } from "@/models";
import User from "@/models/user/user";
import { BadRequestError } from "@/utils/customErrorClass";
import { AnswerFilterSchema, AnswerFormSchema } from "@inquestia/schemas";
import {
  AnswerDTO,
  QuestionDTO,
  QuestionWithAnswers,
  UserDTO,
} from "@inquestia/types";
import mongoose from "mongoose";
import z from "zod";

export type ReformatAnswerProps = {
  survey: {
    _id: string;
    title: string;
    description: string;
    questions: QuestionDTO[];
    authorId: string | UserDTO;
    author: UserDTO | null;
  };
  _id: string;
  responses: (
    | {
        type: "text";
        questionId: string;
        answer: string;
      }
    | {
        type: "select";
        questionId: string;
        answers: string[];
      }
  )[];
  respondent: UserDTO | null;
  isAuthentic: boolean;
  respondentId: string | UserDTO;
};

export class AnswerHelper {
  generateAnswerFilterPipeline = (
    filter: z.infer<typeof AnswerFilterSchema>
  ) => {
    const generateMainPipeline = () => {
      const pipeline: any[] = [
        {
          $match: {
            surveyId: new mongoose.Types.ObjectId(filter.surveyId),
          },
        },
      ];

      if (filter.isAuthentic !== null) {
        pipeline.push({
          $match: {
            isAuthentic: filter.isAuthentic,
          },
        });
      }

      if (filter.isAnonymous !== null) {
        pipeline.push({
          $match: {
            isAnonymous: filter.isAnonymous,
          },
        });
      }

      for (const f of filter.responses) {
         const questionId = new mongoose.Types.ObjectId(f.questionId);
        if (f.type === "text" && f.answer.trim() !== "") {
         ``

          pipeline.push({
            $match: {
              responses: {
                $elemMatch: {
                  questionId: questionId,
                  type: "text",
                  answer: { $regex: f.answer, $options: "i" },
                },
              },
            },
          });
        }

        if (f.type === "select" && f.answers.length > 0) {

          pipeline.push({
            $match: {
              $expr: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$responses",
                        as: "response",
                        cond: {
                          $and: [
                            { $eq: ["$$response.questionId", questionId] },
                            { $setIsSubset: [f.answers, "$$response.answers"] },
                          ],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
            },
          });
        }
      }

      return pipeline;
    };

    const pip = generateMainPipeline();

    return pip;
  };

  validateAnswerForm = ({
    myId,
    survey,
    answerForm,
  }: {
    myId: string;
    survey: SurveyModel;
    answerForm: z.infer<typeof AnswerFormSchema>;
  }) => {
    if (myId === String(survey.authorId)) {
      throw new BadRequestError(
        "You can't be your own respondent.",
        "AUTHOR_RESPONDENT_CONFLICT"
      );
    }
    if (survey.respondents.some((id) => String(id) === myId)) {
      throw new BadRequestError(
        "You have already submitted an answer to this survey.",
        "DUPLICATE_ANSWER_SUBMISSION"
      );
    }

    for (const q of survey.questions) {
      if (!q.isRequired) {
        continue;
      }

      const questionAnswer = answerForm.responses.find(
        ({ questionId }) => questionId === String(q._id)
      );

      if (!questionAnswer) {
        throw new BadRequestError(
          `Missing answer on question ${q._id}`,
          "MISSING_ANSWER"
        );
      }

      if (
        questionAnswer.type === "text" &&
        questionAnswer.answer.trim() === ""
      ) {
        throw new BadRequestError(
          `Missing answer on question ${q._id}`,
          "MISSING_ANSWER"
        );
      }

      if (
        questionAnswer.type === "select" &&
        questionAnswer.answers.length === 0
      ) {
        throw new BadRequestError(
          `Missing answer on question ${q._id}`,
          "MISSING_ANSWER"
        );
      }
    }

    if (
      !survey.questions.every((q) =>
        answerForm.responses.some(
          ({ questionId }) => String(q._id) === questionId
        )
      )
    ) {
      throw new BadRequestError("Unknown question ID.", "UNKNOWN_QUESTION_ID");
    }
  };

  reformatSurveyAnswer = (answer: ReformatAnswerProps) => {
    const questions = answer.survey.questions.map((q) => {
      const ans = answer.responses.find(
        (r) => String(r.questionId) === String(q._id)
      ) ?? {
        type: "text",
        questionId: "",
        answer: "",
      };

      if (ans.type === "select" && q.type === "select") {
        return {
          question: q.question,
          isRequired: q.isRequired,
          questionId: ans.questionId,
          type: ans.type,
          answers: ans.answers,
          choices: q.choices,
        };
      }

      if (ans.type === "text" && q.type === "text") {
        return {
          question: q.question,
          isRequired: q.isRequired,
          questionId: ans.questionId,
          type: ans.type,
          answer: ans.answer,
        };
      }
    });
    
    const base = {
      title: answer.survey.title,
      isAuthentic: answer.isAuthentic,
      description: answer.survey.description,
      respondentId:
        typeof answer.respondentId === "string"
          ? answer.respondentId
          : answer.respondentId._id,
      respondent: new User(answer.respondent).getSafeDetails(),
      questions,
      survey: {
        ...answer.survey,
        author: !answer.survey.author
          ? null
          : new User(answer.survey.author).getSafeDetails(),
        authorId:
          typeof answer.survey.authorId === "string"
            ? answer.survey.authorId
            : answer.survey.authorId._id,
      },
      _id: answer._id,
    };

    return base;
  };
}
