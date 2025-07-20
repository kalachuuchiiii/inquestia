import List from './List.jsx';
import useQuestionFields from '../hooks/useQuestionFields.js';


const QuestionsList = ({questions = [], surveyId = null, modifyForm = () => {}, readOnly = false, getSurveyQuestionById = () => {}, renderItem = () => {}}) => {
  
return <div>
  {
    questions?.length > 0 && <List className = "p-2 " list = {questions} renderItem = {(question, i) => renderItem(question, i)} />
  }
</div>
}

export default QuestionsList