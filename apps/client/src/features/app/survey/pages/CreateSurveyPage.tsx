
import { useSurveyForm } from "@/features/app/survey/hooks/useSurveyForm.js";
import { SurveyForm } from "@/features/app/survey/components/SurveyForm.js";

const CreateSurveyPage = () => {
  const surveyControls = useSurveyForm();

  return <SurveyForm  {...surveyControls}  />
};

export default CreateSurveyPage;
