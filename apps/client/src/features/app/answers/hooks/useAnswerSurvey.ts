import {  useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
  GetSurveyByIdResponse,
} from "@inquestia/types";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAnswerForm } from "@/features/app/answers/hooks/useAnswerForm";
import { _int16Range } from "chart.js/helpers";
import api from "@/lib/axios.instance";

const useAnswerSurvey = () => {
  const { surveyId = "" } = useParams();
  const nav = useNavigate();
  const { accessToken } = useAppSelector((state) => state.user);
  const { answerForm, setAnswerForm, answerFormControl } = useAnswerForm();

  const {
    data: survey,
    isPending: isFetchingSurvey,
    error: surveyError,
    isFetchedAfterMount,
  } = useQuery({
    queryFn: async () => {
      const res = await api.get<GetSurveyByIdResponse>(
        `/api/survey/${surveyId}`
      );
      const { responses } = res.data;

      setAnswerForm({
        responses,
        surveyId,
        isAnonymous: false,
      });

      return res.data
    },
    queryKey: ["survey", surveyId],

    enabled: !!accessToken,
  });

  useEffect(() => {
    if (isFetchedAfterMount || !survey?.survey) return;
    setAnswerForm({
      responses: survey.responses,
      surveyId,
      isAnonymous: false,
    });
  }, [isFetchedAfterMount]);

  return {
    survey: survey?.survey,
    answerForm,
    answerFormControl,
    surveyError,
    isFetchingSurvey,
  };
};

export default useAnswerSurvey;
