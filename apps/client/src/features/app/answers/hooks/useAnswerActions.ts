import api from "@/lib/axios.instance";
import type { AnswerForm } from "@inquestia/schemas";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const useAnswerActions = () => {
  const { surveyId } = useParams();

  const { mutate: submitAnswer, isPending: isSubmissionPending } = useMutation({
    mutationFn: async (answerForm: AnswerForm) => {
      if (!surveyId) return;
      console.log(answerForm, "form");
      const p = api.post(`/api/survey/${surveyId}/answers`, {
        answerForm,
      });
      toast.promise(p, {
        loading: "Submitting...",
        error: (err) => err.response.data.message,
        success: (res) => res.data.message,
      });
      return await p;
    },
  });

  const {
    mutate: toggleAnswerAuthenticity,
    isPending: isTogglingAuthenticity,
  } = useMutation({
    mutationFn: async (answerId: string) => {
      if (!surveyId) return;
      const p = api.patch(
        `/api/survey/${surveyId}/answers/${answerId}/authenticity`
      );
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
