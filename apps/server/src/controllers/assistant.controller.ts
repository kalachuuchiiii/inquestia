import { ObjectIdSchema } from "@/schemas";
import { AssistantService } from "@/services";
import { IsAuthenticParamSchema, PromptSchema } from "@inquestia/schemas";
import { RequestHandler } from "express";
import Answer from "@/models/answer/answer";
import Survey from "@/models/survey/survey";
import { ForbiddenError } from "@/utils/customErrorClass";

const assistantService = new AssistantService();
export class AssistantController {
  constructor() {}

  summarizeSurvey: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const isAuthentic = IsAuthenticParamSchema.parse(req.query.isAuthentic);
    const { summary } = await assistantService.summarizeSurvey({
      surveyId,
      myId,
      isAuthentic,
    });
    return res.status(200).json({
      success: true,
      summary,
    });
  };

  getStatistics: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);

    const survey = await Survey.findOne({
      _id: surveyId,
      $or: [
        {
          authorizedViewers: {
            $in: [myId],
          },
        },
        {
          authorId: myId,
        },
      ],
    })
      .populate("authorId", "avatar nickname username respondents")
      .lean()
      .orFail(
        new ForbiddenError(
          "You're not permitted to view the answers of this survey.",
          "NOT_PERMITTED"
        )
      );

    // Get select type questions with choices
    const questionsWithChoices = survey.questions.filter(
      (q) => q.type === "close_ended"
    );

    const statistics = await Promise.all(
      questionsWithChoices.map(async (question: any) => {
        const choicesStats = await Promise.all(
          question.choices.map(async (choice: string) => {
            const filter: any = {
              surveyId: String(survey._id),
              "responses.questionId": String(question._id),
              "responses.answers": { $in: [choice] },
            };

            const count = await Answer.countDocuments(filter);
            const totalRespondents = survey.respondents.length;
            const percentage =
              totalRespondents > 0 ? (count / totalRespondents) * 100 : 0;

            return {
              choice,
              count,
              percentage: parseFloat(percentage.toFixed(2)),
            };
          })
        );

        return {
          questionId: question._id,
          question: question.question,
          type: question.type,
          choices: choicesStats,
          createdAt: question.createdAt,
        };
      })
    );

    return res.status(200).json({
      success: true,
      statistics,
      survey: {
        _id: survey._id,
        title: survey.title,
        description: survey.description,
        user: survey.authorId,
      },
    });
  };

  restartConversation: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    await assistantService.restartConversation({ myId });
    return res.status(200).json({
      success: true,
      message: "Restarted your conversation!",
    });
  };

  getConversation: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);

    const { conversation } = await assistantService.getConversation({ myId });
    const response = {
      success: true,
      conversation,
    };
    return res.status(200).json(response);
  };

  sendMessage: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const prompt = PromptSchema.parse(req.body.prompt);
    const { responseContent } = await assistantService.sendMessage({
      myId,
      prompt,
    });

    const response = {
      responseContent,
      success: true,
    };
    return res.status(200).json(response);
  };
}
