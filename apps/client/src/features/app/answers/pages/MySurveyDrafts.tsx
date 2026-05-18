import { useAppSelector } from "@/hooks/useAppSelector.js";
import { useSurveyForm } from "@/features/app/survey/hooks/useSurveyForm.js";

import { _capitalize } from "chart.js/helpers";
import { SurveyForm } from "@/features/app/survey/components/SurveyForm.js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "@/lib/axios.instance";
import { useAccount } from "../../account/hooks/useAccount";

const MySurveyDrafts = () => {
  const { data: user } = useAccount();
  const { surveyId } = useParams();
  const surveyControls = useSurveyForm();
  const { surveyForm } = surveyControls;
  useQuery({
    queryFn: async () => {
      const res = await api.get(`/api/survey/${surveyId}`);
      surveyForm.reset(res.data.survey);
    },
    queryKey: ["survey", surveyId],
    enabled: !!user,
  });

  return <SurveyForm footer={<></>} {...surveyControls} />;
};

export default MySurveyDrafts;
