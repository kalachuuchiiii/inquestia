import { QUESTION_TYPE_ENUM } from "@shared/constants";
import { QueryParamParser, QuestionChoiceListSchema, QuestionChoiceSchema, QuestionTitleSchema, QuestionTypeSchema, TextAnswerSchema } from "@shared/schemas";
import { RequestHandler } from "express";

const { default: z } = require("zod");
const Answer = require("../../../models/answer");
const Survey = require("../../../models/survey");
const { default: mongoose } = require("mongoose");
const { verifyObjectId } = require("../../../utils/schema/verifyObjectId");

const questionBaseSchema = z.object({
  _id: z.string(),
  question: QuestionTitleSchema.catch(''),
  isRequired: z.boolean(),
  isStrict: z.boolean(),
  type: QuestionTypeSchema
});

const selectQuestionSchema = questionBaseSchema.extend({
  type: z.literal("select"),
  choices: QuestionChoiceListSchema,
  multipleChoice: z.boolean(),
  answer: QuestionChoiceListSchema,
});

const textQuestionSchema = questionBaseSchema.extend({
  type: z.literal("text"),
  answer: TextAnswerSchema
});
const surveySchema = z.object({
  questions: z.array(z.union([selectQuestionSchema, textQuestionSchema])),
  isAuthentic: z.enum(['AUTHENTIC', 'NOT_AUTHENTIC', '*'])
});

exports.filterSurveyList = (isPaginated = false, limit): RequestHandler => {
  return async (req, res, next) => {
    const userId = z.string().parse(req.userId);
    const surveyId = verifyObjectId(req?.params?.surveyId);
    const filter = JSON.parse(req?.query?.filter);

    const { skip } = QueryParamParser.parse(req.query);
    const [survey, totalAnswers] = await Promise.all([
      Survey.findById(surveyId).lean(),
      Answer.countDocuments({ survey: surveyId }),
    ]);

    if (!survey) {
      return res.status(400).json({
        success: false,
        message: "Survey not found.",
      });
    }

    if (survey?.isDraft) {
      return res.status(400).json({
        success: false,
        message: "You can't generate a summary of a draft",
      });
    }

    if (
      survey.user.toString() !== verifiedUser._id.toString() &&
      !survey?.authorizedViewers?.some(
        (viewerId) => String(viewerId) === String(verifiedUser._id)
      )
    ) {
      return res.status(401).json({
        success: false,
        message: "You're not permitted to view answers from this survey.",
      });
    }
    if (!filter) {
      const answers = await Answer.aggregate([
        { $match: { survey: survey._id } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            "user._id": 0,
            "user.password": 0,
          },
        },
      ]);
      req.filteredData = {
        success: true,
        answers: answers.map((ans) => ({ ...ans, survey })),
        survey,
        totalAnswers,
        nextPage: isPaginated ? req?.getNextPage(totalAnswers) : null,
        plainAnswers: answers,
      };
      return next();
    }

    const parsedFilter = surveySchema.parse(filter);
    const { questions: filterQuestions, isAuthentic } = parsedFilter;

    //   const data = {
    //     questions: [
    //       {
    //         isStrict: false,
    //         type: ['select', 'text'], //enum
    //         answer: [['opt', 'choice'], 'textual'], //enum
    //         _id: objectId,
    //       }
    //     ],
    //
    //   }

    const exprClauses = filterQuestions.map((filterQ) => {
      if (filterQ.type === "select") {
        if (filterQ.isStrict) {
          return {
            $anyElementTrue: [
              {
                $map: {
                  input: "$answers",
                  as: "ans",
                  in: {
                    $and: [
                      {
                        $eq: [
                          "$$ans.question",
                          new mongoose.Types.ObjectId(filterQ._id),
                        ],
                      },
                      { $setEquals: ["$$ans.answer", filterQ.answer] },
                    ],
                  },
                },
              },
            ],
          };
        } else {
          return {
            $anyElementTrue: [
              {
                $map: {
                  input: "$answers",
                  as: "ans",
                  in: {
                    $and: [
                      {
                        $eq: [
                          "$$ans.question",
                          new mongoose.Types.ObjectId(filterQ._id),
                        ],
                      },
                      {
                        $setIsSubset: [
                          "$$ans.answer",
                          {
                            $cond: {
                              if: {
                                $and: [
                                  { $ne: [filterQ.answer, null] },
                                  { $ne: [filterQ.answer, ""] },
                                  {
                                    $gt: [
                                      {
                                        $size: {
                                          $ifNull: [filterQ.answer, []],
                                        },
                                      },
                                      0,
                                    ],
                                  },
                                ],
                              },
                              then: filterQ.answer,
                              else: "$$ans.answer",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          };
        }
      }

      if (filterQ.type === "text") {
        if (filterQ.isStrict) {
          return {
            $anyElementTrue: [
              {
                $map: {
                  input: "$answers",
                  as: "ans",
                  in: {
                    $and: [
                      {
                        $eq: [
                          "$$ans.question",
                          new mongoose.Types.ObjectId(filterQ._id),
                        ],
                      },
                      {
                        $regexMatch: {
                          input: { $toLower: "$$ans.answer" },
                          regex: `^${filterQ.answer.toLowerCase()}$`,
                        },
                      },
                    ],
                  },
                },
              },
            ],
          };
        } else {
          return {
            $anyElementTrue: [
              {
                $map: {
                  input: "$answers",
                  as: "ans",
                  in: {
                    $and: [
                      {
                        $eq: [
                          "$$ans.question",
                          new mongoose.Types.ObjectId(filterQ._id),
                        ],
                      },
                      {
                        $cond: {
                          if: {
                            $or: [
                              { $eq: ["$$ans.answer", null] },
                              { $eq: ["$$ans.answer", ""] },
                              { $eq: [{ $type: "$$ans.answer" }, "missing"] },
                            ],
                          },
                          then: true,
                          else: {
                            $regexMatch: {
                              input: { $toLower: "$$ans.answer" },
                              regex: filterQ.answer.toLowerCase(),
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          };
        }
      }
      return null;
    });

    const filterMatch = {
      $expr: { $and: exprClauses },
      survey: survey._id,
    };
    switch (isAuthentic) {
      case "true":
        filterMatch.isAuthentic = true;
        break;
      case "false":
        filterMatch.isAuthentic = false;
        break;
    }

    const pipeline = [
      { $match: filterMatch },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          "user._id": 0,
          "user.password": 0,
        },
      },
    ];

    const [filteredAgg] = await Answer.aggregate([
      { $match: filterMatch },
      { $count: "total" },
    ]);
    const totalFiltered = filteredAgg?.total || 0;

    const answers = await Answer.aggregate(pipeline);

    req.filteredData = {
      success: true,
      nextPage: isPaginated ? req.getNextPage(totalFiltered) : null,
      answers: answers.map((a) => ({ ...a, survey })),
      plainAnswers: answers,
      survey,
      totalAnswers: totalFiltered,
    };
    next();
  };
};
