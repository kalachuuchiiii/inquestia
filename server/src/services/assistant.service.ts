import { ENV_CONFIG } from "@/config/environmentVars";
import redis from "@/config/redis";
import { INKO_SYSTEM_PROMPT } from "@/constants/assistant.constants";
import User from "@/models/user/user";
import { NotFoundError } from "@/utils/errors/customErrorClass";
import axios from "axios";

export class AssistantService {

  restartConversation = async({ userId}: {userId: string}) => {
    const user = await User.exists({ _id: userId }).orFail(new NotFoundError('User not found.', 'USER_NOT_FOUND'));
    const conversationKey = `conversation:${user._id}`;
    await redis.del(conversationKey);
    return { success: true };
  }

  getConversation = async ({ userId }: { userId: string }) => {
    const user = await User.exists({ _id: userId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const conversationKey = `conversation:${user._id}`;
    const conversation = JSON.parse((await redis.get(conversationKey)) ?? "[]");

    return {
        conversation
    }
  };

  sendMessage = async ({
    userId,
    prompt,
  }: {
    userId: string;
    prompt: string;
  }) => {
    const user = await User.exists({ _id: userId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );

    const conversationKey = `conversation:${user._id}`;
    const promptObject = {
      //user prompt
      content: prompt,
      role: "user",
    };

    const conversation =
      JSON.parse((await redis.get(conversationKey)) ?? "[]") ?? []; //messages;
    const updatedConversation = [...conversation, { ...promptObject }]; //messages including the prompt

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: INKO_SYSTEM_PROMPT },
          ...updatedConversation,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${ENV_CONFIG.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseContent: string =
      response.data?.choices?.[0]?.message?.content ?? "Internal Server Error."; //ai's response (string);

    await redis.set(
      conversationKey,
      JSON.stringify([
        ...updatedConversation,
        { role: "system", content: responseContent },
      ])
    ); //saving the entire conversation in redis;

    return {
      responseContent,
    };
  };
}
