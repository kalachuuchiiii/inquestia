import redis from "@/config/redis";
import { ObjectIdSchema } from "@/schemas";
import { AssistantService } from "@/services";
import { GetConversationResponse, SendMessageResponse } from "@/types";
import { PromptSchema } from "@shared/schemas";
import { RequestHandler } from "express";

const assistantService = new AssistantService();
export class AssistantController {
  constructor() {}

  restartConversation: RequestHandler = async(req, res) => {
    const userId = ObjectIdSchema.parse(req.userId);
    await assistantService.restartConversation({ userId });
    return res.status(200).json({
        success: true,
        message: 'Restarted your conversation!'
    })
  }

  getConversation: RequestHandler = async (req, res) => {
    const userId = ObjectIdSchema.parse(req.userId);

    const { conversation } = await assistantService.getConversation({ userId });
    const response: GetConversationResponse = {
      success: true,
      conversation,
    };
    return res.status(200).json(response);
  };

  sendMessage: RequestHandler = async (req, res) => {
    const userId = ObjectIdSchema.parse(req.userId);
    const prompt = PromptSchema.parse(req.body.prompt);
    const { responseContent } = await assistantService.sendMessage({
      userId,
      prompt,
    });

    const response: SendMessageResponse = {
      responseContent,
      success: true,
    };
    return res.status(200).json(response);
  };
}
