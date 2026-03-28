
import { ObjectIdSchema } from "@/schemas";
import { AssistantService } from "@/services";
import { IsAuthenticParamSchema, PromptSchema } from "@inquestia/schemas";
import { GetConversationResponse, SendMessageResponse } from "@inquestia/types";
import { RequestHandler } from "express";
import Answer from "@/models/answer/answer";
import Survey from "@/models/survey/survey";

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
      isAuthentic
    });
    return res.status(200).json({
      success: true,
      summary,
    });
  };

  getStatistics: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const isAuthentic = IsAuthenticParamSchema.parse(req.query.isAuthentic ?? null);

    // Verify survey ownership or authorization
    const survey = await Survey.findOne({ _id: surveyId })
      .populate("authorId", "avatar nickname username respondents")
      .lean();

    if (!survey) {
      return res.status(404).json({
        success: false,
        message: "Survey not found",
      });
    }

    if (
      String(myId) !== String((survey.authorId as any)._id) &&
      !survey.authorizedViewers?.some((viewer: any) => String(viewer) === String(myId))
    ) {
      return res.status(401).json({
        success: false,
        message: "You're not permitted to view the answers of this survey.",
      });
    }

    // Get select type questions with choices
    const questionsWithChoices = survey.questions.filter(
      (q: any) => q.type === "select" && q?.choices && q.choices.length > 0
    );

    // Build statistics for each question
    const statistics = await Promise.all(
      questionsWithChoices.map(async (question: any) => {
        const choicesStats = await Promise.all(
          question.choices.map(async (choice: string) => {
            const filter: any = {
              surveyId: String( survey._id),
              "responses.questionId": String(question._id),
              "responses.answers": { $in: [choice] },
            };

            if (isAuthentic !== null) {
              filter.isAuthentic = isAuthentic;
            }

            const count = await Answer.countDocuments(filter);
           const totalRespondents = survey.respondents.length;
            const percentage =
              totalRespondents > 0
                ? (count / totalRespondents) * 100
                : 0;

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
        totalRespondents: survey.totalRespondents,
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
    const response: GetConversationResponse = {
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

    const response: SendMessageResponse = {
      responseContent,
      success: true,
    };
    return res.status(200).json(response);
  };
}
