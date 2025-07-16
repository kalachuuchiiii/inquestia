import List from './List.jsx';
import QuestionCard from './QuestionCard.jsx';
import useQuestionFields from '../hooks/useQuestionFields.js';

const QuestionsList = ({questions = [], surveyId, modifyForm, getSurveyQuestionById}) => {
  
  
return <div >
  <List className = "p-2 rounded-r-xl bg-neutral-100 border-l-2 border-blue-300" list = {questions} renderItem = {(question, i) => <QuestionCard handleChange = {modifyForm} answer = {getSurveyQuestionById(question._id)?.answer || ""} questionData = {question} i = {i} /> } />
</div>
}

export default QuestionsList