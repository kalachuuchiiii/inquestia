import { useParams } from "react-router-dom";
import { surveys } from '../../data/mockData/surveyList.js';
import SurveyCard from '../../components/SurveyCard.jsx';
import QuestionsList from '../../components/QuestionsList.jsx';
import useQuestionFields from '../../hooks/useQuestionFields.js';
import { questions } from '../../data/mockData/questions.js';

const AnswerSurvey = () => {
  
  const surveyId = useParams()?.id || null;
  
  const selectedSurvey = surveys.find(s => s._id === surveyId);
  const questionList = questions.filter((quest) => quest.surveyId === surveyId) || [];
  
  const { _id } = selectedSurvey;
  
  const { getSurveyQuestionById, error, submitSurvey, modifyForm } = useQuestionFields({ initial: questionList, surveyId: _id});
  
return <form onSubmit = {submitSurvey}>
  <SurveyCard survey = {selectedSurvey} >
    <SurveyCard.User /> 
    <SurveyCard.Header /> 
    <QuestionsList modifyForm = {modifyForm} getSurveyQuestionById = {getSurveyQuestionById} questions = {questionList} surveyId = {_id} />
    <p className = "text-red-400 text-sm p-1">{error && error}</p>
    <SurveyCard.TargetRespondents />
    <div className = "text-right">
      
          <button type = "submit" className = "text-right mx-3 pr-4 pl-2 py-1  text-zinc-900 mt-4 mb-10">Submit Response</button>
    </div>
  </SurveyCard>
</form>
}

export default AnswerSurvey