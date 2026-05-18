import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "@/lib/axios.instance";
import { useAnswerFormController } from "./useAnswerForm";
import type { Answer, Response, Survey } from "@inquestia/schemas";
import { useAccount } from "../../account/hooks/useAccount";

export const useSurveyAnswers = () => {
  const { surveyId = "" } = useParams();
  const { data: user } = useAccount();
  const queryClient = useQueryClient();
  const formController = useAnswerFormController();
  const { answerForm: filterForm } = formController;
  const { data } = useQuery({
    queryFn: async () => {
      const res = await api.get<{ responses: Response[]; survey: Survey }>(
        `/api/survey/${surveyId}`
      );
      filterForm.reset({
        responses: res.data.responses,
        surveyId,
        isAnonymous: false,
      });
      return res.data;
    },
    queryKey: ["survey", surveyId],
    enabled: !!user && !!surveyId,
  });

  const survey = data?.survey;

  const { data: answerData, refetch } = useInfiniteQuery({
    queryKey: ["answer", surveyId],
    queryFn: async () => {
      const res = await api.get<{
        answers: Answer[];
        nextPage: number | undefined;
      }>(`/api/survey/${surveyId}/answers?page=${1}&limit=${30}`, {
        params: {
          filter: JSON.stringify(filterForm.getValues()),
        },
      });
      return res;
    },
    getNextPageParam: (res) => res.data.nextPage,
    initialPageParam: 1,
    enabled: !!user && !!surveyId,
  });

  const answers = answerData?.pages.flatMap((p) => p.data.answers) ?? [];

  const applyFilters = async () => {
    await queryClient.invalidateQueries({ queryKey: ["answer", surveyId] });
  };

  return {
    survey,
    applyFilters,
    filterForm,
    answers,
    formController,
  };
};
