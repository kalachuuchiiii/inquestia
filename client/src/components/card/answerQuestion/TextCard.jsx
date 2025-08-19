import TextArea from '../../html/Textarea.jsx';
import useCTX from '../../../hooks/useCTX.js';
import { AnswerQuestionContext } from '../../../context/answerQuestionContext.js';
const TextCard = ({question = {
}, index = 1}) => {
  const { type, _id } = question;
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
  

return <div className = "bg-zinc-950 px-3 py-6">
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
    <TextArea value = {getFieldById(_id)?.answer} onChange = {handleChange} className = "bg-zinc-900 rounded" placeholder = "Your answer here..." />
  </div>
</div>
}

export default TextCard