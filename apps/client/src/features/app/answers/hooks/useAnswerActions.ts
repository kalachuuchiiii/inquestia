
import api from "@/lib/axios.instance";
import type { AnswerFormFields, QuestionWithAnswers } from "@inquestia/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const useAnswerActions = () => {
  const nav = useNavigate();
  const { surveyId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: submitAnswer, isPending: isSubmissionPending } = useMutation({
    mutationFn: async (answerForm: AnswerFormFields) => {
      if (!surveyId) return;
      const p =  api.post(`/api/survey/${surveyId}/answers`, {
         answerForm,
      });
      await toast.promise(p, {
          loading: 'Submitting...',
          error: (err) => err.response.data.message,
          success: (res) => res.data.message
      })
      return await p;
    },
  });

   const { mutate: toggleAnswerAuthenticity, isPending: isTogglingAuthenticity } = useMutation({
    mutationFn: async (answerId: string) => {
      if (!surveyId) return;
      const p = api.patch(`/api/survey/${surveyId}/answers/${answerId}/authenticity`);
      return await p;
    },
    throwOnError: true,
  
  });

  return {
    submitAnswer,
    isSubmissionPending,
    toggleAnswerAuthenticity,
    isTogglingAuthenticity,
  };
};
