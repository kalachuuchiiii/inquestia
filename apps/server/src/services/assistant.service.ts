import { ENV_CONFIG } from "@/config/env";
import { INKO_SYSTEM_PROMPT } from "@/constants/assistant.constants";
import Answer from "@/models/answer/answer";
import Survey from "@/models/survey/survey";
import User from "@/models/user/user";
import { conversationStore } from "@/store/ConversationStore";
import { NotFoundError } from "@/utils/customErrorClass";
import type { ConversationMessage } from "@inquestia/types";
import axios from "axios";

export class AssistantService {
  summarizeSurvey = async ({
    myId,
    surveyId,
    isAuthentic,
  }: {
    myId: string;
    surveyId: string;
    isAuthentic: boolean | null;
  }) => {
    const user = await User.exists({ _id: myId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );

    const survey = await Survey.findOne({ authorId: myId, _id: surveyId })
      .populate("questions")
      .orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
          const query = {
      surveyId: survey._id,
    } as any;

    if (isAuthentic !== null) {
      query.isAuthentic = isAuthentic;
      
    }

    const answers = await Answer.find(query).lean();

    // Build prompts for each question
    const questionPrompts: string[] = [];

    for (const question of survey.questions) {
      const questionAnswers = answers.flatMap((answer: any) =>
        answer.responses
          .filter((r: any) => String(r.questionId) === String(question._id))
          .map((r: any) => {
            if (r.type === "text") {
              return r.answer;
            } else if (r.type === "select") {
              return r.answers.join(", ");
            }
            return "";
          })
          .filter((a: string) => a !== "")
      );

      const answerString = questionAnswers.join("\n");

      questionPrompts.push(
        `Question: ${question.question}\n\nResponses:\n${answerString}`
      );
    }

    const sysData = INKO_SYSTEM_PROMPT;
    const fullPrompt = questionPrompts.join("\n\n---\n\n");

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: sysData },
          {
            role: "user",
            content: `Please summarize the following survey responses:\n\n${fullPrompt}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${ENV_CONFIG.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary =
      response.data?.choices?.[0]?.message?.content ??
      "Unable to generate summary.";

    return { summary };
  };

  restartConversation = async ({ myId }: { myId: string }) => {
    const user = await User.exists({ _id: myId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const conversationKey = `conversation:${user._id}`;
     conversationStore.delete(conversationKey);
    return { success: true };
  };

  getConversation = async ({ myId }: { myId: string }) => {
    const user = await User.exists({ _id: myId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const key = `conversation:${user._id}`;
    const conversation = conversationStore.get(key)?.conversation ?? [];

    return {
      conversation,
    };
  };

  sendMessage = async ({ myId, prompt }: { myId: string; prompt: string }) => {
    const user = await User.exists({ _id: myId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );

    const conversationKey = `conversation:${user._id}`;

    const promptObject: ConversationMessage = {
      //user prompt
      content: prompt,
      role: "user",
    };

    const conversation = conversationStore.get(conversationKey)?.conversation ?? []; //messages;
    const updatedConversation: ConversationMessage[]  = [...conversation, { ...promptObject }]; //messages including the prompt

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

     conversationStore.set(
      conversationKey,
      {
        createdAt: new Date(),
        conversation: [...updatedConversation, { content: responseContent, role: 'system'}]
      }
    ); //saving the entire conversation in redis;

    return {
      responseContent,
    };
  };
}
