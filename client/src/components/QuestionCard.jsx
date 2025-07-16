
import Option from '../components/options/Option.jsx';
import useQuestionField from '../hooks/useQuestionFields.js';

const QuestionCard = ({questionData, i, handleChange, answer}) => {
const { question, _id, required, choices} = questionData;
const qNum = i + 1;


return <div>
  <p className = "text-lg"><span className = "text-red-400">{required && "*"}</span> Q{qNum}: {question}</p>
  {
      choices?.allowMultipleChoice && <p className = "px-4 py-2 bg-zinc-200 rounded-xl text-xs w-fit">Multiple Choice</p>
  }
  <Option questionData = {questionData} handleChange = {(e) => handleChange({answer: e.target.value, questionId: _id})} answer = {answer} />
</div>
}

export default QuestionCard