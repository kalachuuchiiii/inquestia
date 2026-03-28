import { useAppSelector } from "@/hooks/useAppSelector.js";
import { useSurveyForm } from "@/features/app/survey/hooks/useSurveyForm.js";

import { _capitalize } from "chart.js/helpers";
import { SurveyForm } from "@/features/app/survey/components/SurveyForm.js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "@/lib/axios.instance";

const MySurveyDrafts = () => {
  const { user, accessToken } = useAppSelector((state) => state.user);
  const { surveyId } = useParams();
  const surveyControls = useSurveyForm();
  const { setSurveyForm } = surveyControls;
  const { data } = useQuery({
    queryFn: async () => {
      const res = await api.get(`/api/survey/${surveyId}`);
      setSurveyForm(res.data.survey);
    },
    queryKey: ["survey", surveyId],
    enabled: !!accessToken,
  });

  return <SurveyForm {...surveyControls} />;
};

export default MySurveyDrafts;
