import redis from "@/config/redis";
import { ObjectIdSchema } from "@/schemas";
import { AssistantService } from "@/services";

import { PromptSchema } from "@shared/schemas";
import { GetConversationResponse, SendMessageResponse } from "@shared/types";
import { RequestHandler } from "express";

const assistantService = new AssistantService();
export class AssistantController {
  constructor() {}

  restartConversation: RequestHandler = async(req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    await assistantService.restartConversation({ myId });
    return res.status(200).json({
        success: true,
        message: 'Restarted your conversation!'
    })
  }

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
