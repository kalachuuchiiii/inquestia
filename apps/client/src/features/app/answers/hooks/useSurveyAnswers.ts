
import { useAppSelector } from "@/hooks/useAppSelector";
import type { GetMyAnswersResponse, GetSurveyByIdResponse } from "@inquestia/types";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAnswerForm } from "./useAnswerForm";
import { useEffect } from "react";
import api from "@/lib/axios.instance";

export const useSurveyAnswers = () => {
  const { surveyId = "" } = useParams();
  const { accessToken } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const {
    answerForm: filterForm,
    setAnswerForm: setFilterForm,
    answerFormControl: filterFormControl,
  } = useAnswerForm();

  const { data, isFetchedAfterMount } = useQuery({
    queryFn: async () => {
      const res = await api.get<GetSurveyByIdResponse>(
        `/api/survey/${surveyId}`
      );
      setFilterForm({
        responses: res.data.responses,
        surveyId,
        isAnonymous: false,
      });
      return res.data;
    },
    queryKey: ["survey", surveyId],
    enabled: !!accessToken && !!surveyId,
  });

  useEffect(() => {
    if (isFetchedAfterMount || !data?.survey) return;
    setFilterForm({
      responses: data.responses,
      surveyId,
      isAnonymous: false,
    });
  }, [isFetchedAfterMount]);

  const survey = data?.survey;

  const { data: answerData, refetch } = useInfiniteQuery({
    queryKey: ["answer", surveyId],
    queryFn: async () => {
      const res = await api.get<GetMyAnswersResponse>(
        `/api/survey/${surveyId}/answers?page=${1}&limit=${1000}`,
        {
          params: {
             filter: JSON.stringify(filterForm),
          }
        }
      );
      return res;
    },
    getNextPageParam: (res) => res.data.nextPage,
    initialPageParam: 1,
    enabled: !!accessToken && !!surveyId,
  });

  const answers = answerData?.pages.flatMap((p) => p.data.answers) ?? [];

  const applyFilters = async() => {
    await queryClient.removeQueries({queryKey: ['answer', surveyId]})
    refetch();
  }

  return {
    survey,
    applyFilters,
    filterForm,
    answers,
    filterFormControl,
  };
};
