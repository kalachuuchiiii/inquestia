import { useParams } from "react-router-dom";
import { surveys } from '../../data/mockData/surveyList.js';
import SurveyCard from '../../components/SurveyCard.jsx';
import QuestionsList from '../../components/QuestionsList.jsx';
import useQuestionFields from '../../hooks/useQuestionFields.js';
import { questions } from '../../data/mockData/questions.js';
import QuestionCard from '../../components/QuestionCard.jsx';

const AnswerSurvey = () => {
  
  const surveyId = useParams()?.id || null;
  
  const selectedSurvey = surveys.find(s => s._id === surveyId);
  const questionList = questions.filter((quest) => quest.surveyId === surveyId) || [];
  
  const { _id } = selectedSurvey;
  
  const { getSurveyQuestionById, error, submitSurvey, modifyForm } = useQuestionFields({ initial: questionList, surveyId: _id});
  
return (
  <div className = "p-1">
    <form className = "backdrop-brightness-25 p-2 rounded" onSubmit = {submitSurvey}>
  <SurveyCard survey = {selectedSurvey} >
    <SurveyCard.User /> 
    <SurveyCard.Header /> 
    <QuestionsList modifyForm = {modifyForm} getSurveyQuestionById = {getSurveyQuestionById} questions = {questionList} surveyId = {_id} renderItem = {(question, i) => <QuestionCard handleChange = {modifyForm} answer = {getSurveyQuestionById(question._id)?.answer || [] } questionData = {question} i = {i} >
      <QuestionCard.Question /> 
      <QuestionCard.MultiChoice /> 
      <QuestionCard.RenderOption />
    </QuestionCard>} />
    <p className = "text-red-400 text-sm p-1">{error && error}</p>
    <SurveyCard.TargetRespondents />
    <div className = "text-right">
      
          <button type = "submit" className = "text-right mx-3 pr-4 pl-2 py-1  mt-4 mb-10">Submit Response</button>
    </div>
  </SurveyCard>
</form>
  </div>)
}

export default AnswerSurvey