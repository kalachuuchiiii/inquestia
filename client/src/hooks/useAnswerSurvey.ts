import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "./useApi";
import type { GetSurveyByIdResponse, QuestionDTO } from "@shared/types";
import { useAppSelector } from "./useAppSelector";

const useAnswerSurvey = () => {
  const { surveyId = '' } = useParams();
  const nav = useNavigate();
  const { accessToken } = useAppSelector(state => state.user);
  const [questionFormFields, setQuestionFormFields] = useState<QuestionDTO[]>(
    []
  );
  const api = useApi();

  const { data: survey, isPending: isFetchingSurveyPending, isError: isFetchingSurveyError } = useQuery({
    queryFn: async () => {
      const res = await api.get<GetSurveyByIdResponse>(
        `/api/survey/find-by-id/${surveyId}`
      );
      setQuestionFormFields(
        res.data.survey.questions.map((f) => ({
          ...f,
          answer: f.type === "select" ? [] : "",
        }))
      );
      return res.data.survey;
    },
    queryKey: ["survey", surveyId],
    enabled: !!accessToken
  });

  const { mutate: submitAnswer, isPending: isSubmissionPending } = useMutation({
    mutationFn: async () => {
      const res = await api.post("api/answer/submit", {
        answers: questionFormFields,
        survey,
      });
      return res;
    },
    onSuccess: () => {
      nav("/response-history");
    },
    
  });

  return {
    survey,
    questionFormFields,
    submitAnswer,
    isFetchingSurveyError,
    isFetchingSurveyPending,
    isSubmissionPending,
  };
};

export default useAnswerSurvey;
