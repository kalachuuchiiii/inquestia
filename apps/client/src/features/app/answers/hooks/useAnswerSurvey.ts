import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector } from "@/hooks/useAppSelector";
import { useAnswerFormController } from "@/features/app/answers/hooks/useAnswerForm";
import { _int16Range } from "chart.js/helpers";
import api from "@/lib/axios.instance";
import type { AnswerForm, Survey } from "@inquestia/schemas";
import { useAnswerActions } from "./useAnswerActions";
import { useAccount } from "../../account/hooks/useAccount";

const useAnswerSurvey = () => {
  const { surveyId = "" } = useParams();
  const { data: user } = useAccount();
  const formController = useAnswerFormController();
  const answerActions = useAnswerActions();
  const { submitAnswer, isSubmissionPending } = answerActions;

  const {
    data: survey,
    isPending: isFetchingSurvey,
    error: surveyError,
    isFetchedAfterMount,
  } = useQuery({
    queryFn: async () => {
      const res = await api.get<{
        responses: AnswerForm["responses"];
        survey: Survey;
      }>(`/api/survey/${surveyId}`);
      const { responses } = res.data;

      formController.answerForm.reset({
        responses,
        surveyId,
        isAnonymous: false,
      });

      return res.data;
    },
    queryKey: ["survey", surveyId],
    enabled: !!user,
  });

  const onAnswerSubmit = () => {
    const formValues = formController.answerForm.getValues();
    submitAnswer(formValues);
  };

  useEffect(() => {
    if (isFetchedAfterMount || !survey?.survey) return;
    formController.answerForm.reset({
      responses: survey.responses,
      surveyId,
      isAnonymous: false,
    });
  }, [isFetchedAfterMount]);

  return {
    survey: survey?.survey,
    formController,
    surveyError,
    answerActions,
    onAnswerSubmit,
    isFetchingSurvey,
  };
};

export default useAnswerSurvey;
