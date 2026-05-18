import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios.instance";

import { toast } from "sonner";

const useAssistant = () => {
  const queryClient = useQueryClient();
  const [prompt, setPrompt] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data: conversation, isPending: isFetchingConversation } = useQuery({
    queryFn: async () => {
      const res = await api.get("/api/assistant/conversation");

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
        queryClient.setQueryData(["conversation"], []);
      },
    });

  const { mutate: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: async () => {
      setPrompt("");
      const res = await api.post("/api/assistant/conversation", {
        prompt,
      });
      return res;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["conversation"] });
    },
    onMutate: async (prompt: string) => {
      queryClient.setQueryData(["conversation"], (old: any = []) => [
        ...old,
        { role: "user", content: prompt },
      ]);
    },
  });

  const handleOnKeyEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(prompt);
    }
  };

  useEffect(() => {
    if (!conversation || !bottomRef.current) return;

    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.length]);

  return {
    conversation: conversation ?? [],
    sendMessage,
    handleOnKeyEnter,
    restartConversation,
    isSendingMessage,
    prompt,
    setPrompt,
    bottomRef,
    isFetchingConversation,
    isRestartingConversation,
  };
};

export default useAssistant;
