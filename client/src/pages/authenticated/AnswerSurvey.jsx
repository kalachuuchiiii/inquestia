import { useParams } from "react-router-dom";
import { surveys } from '../../data/mockData/surveyList.js';
import SurveyCard from '../../components/SurveyCard.jsx';
import QuestionsList from '../../components/QuestionsList.jsx';
import useQuestionFields from '../../hooks/useQuestionFields.js';

const AnswerSurvey = () => {
  
  const { id } = useParams(); 
  
  const [survey] = surveys.filter(s => s._id === id);
  
  const { questions, _id } = survey;
  
  const { questionResponses, getSurveyQuestionById, error, submitSurvey, modifyForm } = useQuestionFields({ initial: questions, surveyId: _id });
  
return <form onSubmit = {submitSurvey}>
  <SurveyCard survey = {survey} >
    <SurveyCard.User /> 
    <SurveyCard.Header /> 
    <QuestionsList modifyForm = {modifyForm} getSurveyQuestionById = {getSurveyQuestionById} questions = {questions} surveyId = {_id} />
    <p className = "text-red-400 text-sm p-1">{error && error}</p>
    <SurveyCard.TargetRespondents />
    <div className = "text-right">
      
          <button type = "submit" className = "text-right mx-3 pr-4 pl-2 py-1  text-zinc-900 mt-4 mb-10">Submit Response</button>
    </div>
  </SurveyCard>
</form>
}

export default AnswerSurvey