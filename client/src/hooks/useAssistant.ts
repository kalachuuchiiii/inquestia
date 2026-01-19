import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import type {
  ConversationMessage,
  GetConversationResponse,
  SendMessageResponse,
} from "@shared/types";
import { toast } from "sonner";

const useAssistant = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  const { data: conversation, isPending: isFetchingConversation } = useQuery({
    queryFn: async () => {
      toast.loading("Getting your conversation with Inko...", {
        id: "fetching-conversation",
      });
      const res = await api.get<GetConversationResponse>(
        "/api/assistant/conversation"
      );
      toast.dismiss("fetching-conversation");
      return res.data.conversation;
    },
    queryKey: ["conversation"],
  });

  const { mutate: restartConversation, isPending: isRestartingConversation } =
    useMutation({
      mutationFn: async () => {
        toast.loading("Restarting your conversation with Inko...", {
          id: "restarting-conversation",
        });
        const res = await api.delete("/api/assistant/conversation");
        toast.dismiss("restarting-conversation");
        return res;
      },
      onSuccess: () => {
        queryClient.setQueryData(['conversation'], []);
      }
    });

  const { mutate: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: async (prompt: string) => {
      const res = await api.post<SendMessageResponse>(
        "/api/assistant/conversation",
        {
          prompt,
        }
      );
      return res;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["conversation"] });
    },
    onMutate: async (prompt: string) => {
      queryClient.setQueryData<ConversationMessage[]>(
        ["conversation"],
        (old = []) => [...old, { role: "user", content: prompt }]
      );
    },
  });

  return {
    conversation: conversation ?? [],
    sendMessage,
    restartConversation,
    isSendingMessage,
    isFetchingConversation,
    isRestartingConversation,
  };
};

export default useAssistant;
