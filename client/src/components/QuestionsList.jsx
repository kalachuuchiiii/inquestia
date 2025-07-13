import List from './List.jsx';
import QuestionCard from './QuestionCard.jsx';
import useQuestionFields from '../hooks/useQuestionFields.js';

const QuestionsList = ({questions = [], surveyId, modifyForm, getSurveyQuestionById}) => {
  
  
return <div >
  <List className = "p-2 rounded-r-xl bg-neutral-100 border-l-2 border-blue-300" list = {questions} renderItem = {(formField, i) => <QuestionCard handleChange = {modifyForm} answer = {getSurveyQuestionById(formField.id)?.answer || ""} formField = {formField} i = {i} /> } />
</div>
}

export default QuestionsList