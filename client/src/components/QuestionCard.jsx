
import Option from '../components/options/Option.jsx';
import useQuestionField from '../hooks/useQuestionFields.js';
import { IoIosClose } from "react-icons/io";
import { createContext, useContext } from 'react';
const QuestionCardContext = createContext(null);

const QuestionCard = ({questionData = {}, i = 0, handleChange = () => {}, answer = [], readOnly = false, children = null}) => {
const qNum = i + 1;


return <QuestionCardContext.Provider value = {{
  qNum, 
  questionData, 
  readOnly, 
  answer,
  handleChange
}}>

{children}
</QuestionCardContext.Provider>
}

QuestionCard.Question = () => {
  const { questionData: ctx, qNum } = useContext(QuestionCardContext);
  
  return <p className = "text-lg"><span className = "text-red-400">{ctx?.required && "*"}</span> Q{qNum}: {ctx?.question}</p>
}

QuestionCard.RenderOption = () => {
  const { questionData: ctx, qNum, handleChange, answer } = useContext(QuestionCardContext);
  
   return <Option readOnly = {ctx?.readOnly} questionData = {ctx} handleChange = {(e) => handleChange({answer: e.target.value, questionId: ctx?._id})} answer = {answer} />
}

QuestionCard.MultiChoice = () => {
  const { questionData: ctx } = useContext(QuestionCardContext);
  return <>
      {
      ctx?.choices?.allowMultipleChoice && <p className = "px-4 py-2 bg-zinc-200 rounded-xl text-xs w-fit">Multiple Choice</p>
  }
  </>
  
  
}



QuestionCard.Remove = ({onRemove, size = 20}) => {
  
  return <button className = "p-2" onClick = {onRemove}>
    <IoIosClose size = {size} />
  </button>
} 

export default QuestionCard