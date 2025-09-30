import TextArea from '../../html/Textarea.jsx';
import useCTX from '../../../hooks/useCTX.js';
import { AnswerQuestionContext } from '../../../context/answerQuestionContext.js';
const TextCard = ({question = {
}, index = 1}) => {
  const { _id } = question;
  const {
    modifyFieldById = () => {}, 
    getFieldById = () => {}
  } = useCTX(AnswerQuestionContext);
  
  const handleChange = (e) => {
    const { value } = e.target;

    modifyFieldById((prev) => {
      return {
        ...prev, 
        answer: value
      }
    },_id)
  }

  

return <div className = " px-3 py-6 w-full">
  <div>
    <div className = "" >
      <div className = "flex gap-1 items-start">
              {question.isRequired && <p className = "text-xs text-red-400 px-1">*</p>}
      <p className = "opacity-50 text-sm">Question {index}:</p>
      </div>
      <h1 className = "w-full break-all text-lg">
        {question.question}
      </h1>
    </div>
    
  </div>
  <div className = "my-3">
    <TextArea value = {getFieldById(_id)?.answer} onChange = {handleChange} className = "dark:bg-zinc-800 bg-neutral-200 rounded-lg" placeholder = "Your answer here..." />
  </div>
</div>
}

export default TextCard