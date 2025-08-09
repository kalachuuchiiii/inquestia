import Textarea from '../../html/Textarea.jsx';
import { useCallback } from 'react';
import useCTX from '../../../hooks/useCTX.js';
import { TextQuestionContext } from '../../../context/textQuestionContext.js';

const TextQuestion = ({question = {
  answer: '', 
  question: '', 
  isRequired: true
}, setQuestions = () => {}, className = '', children = null, id = 1}) => {
  
  const handleSetQuestion = useCallback((e) => {
    const { name, value } = e.target; 
    setQuestions(prev => prev.map((q, i) => i !== id ? q : ({
      ...q, 
      [name]: value
    })))
  }, []);
  
  const handleToggleRequired = useCallback((e) => {
    setQuestions(prev => prev.map((q, i) => i !== id ? q : ({
      ...q, 
      isRequired: !q.isRequired
    })))
  }, [])

return <TextQuestionContext.Provider value = {{
  handleToggleRequired,
  handleSetQuestion, 
  question, 
  id
}} >
  <div className = {className}>
    {children}
  </div>
</TextQuestionContext.Provider>
}

TextQuestion.QuestionNum = () => {
  let { id = 1 } = useCTX(TextQuestionContext);
  const num = (id + 1) || 1;
  

  return <>
    <p >Question {num}</p>
  </>
}

TextQuestion.RequireCheckbox = () => {
  const { question = { isRequired: false }, handleToggleRequired = () => { } } = useCTX(TextQuestionContext);

  return <div className = "flex gap-1 items-center">
    <div className="text-xs flex gap-1 ">
     <span className="text-red-400">*</span>
     <p>Required</p>
      </div>
    <input onClick={handleToggleRequired} checked={question.isRequired} type="checkbox" />
  </div>
}

TextQuestion.Question = () => {
  const { handleSetQuestion = () => {}, question = { question: '' }} = useCTX(TextQuestionContext);
  
  return <Textarea onChange={handleSetQuestion} name="question" value={question.question} rows={1} limit={150} placeholder="What's your question?" />
}

TextQuestion.AnswerFieldPreview = () => {
  const { question = {
    isRequired: false, 
    answer: ''
  }, handleSetQuestion = () => {}} = useCTX(TextQuestionContext);
  
  return <Textarea requiredDisplay = {question.isRequired} readOnly isRequired = {question.isRequired} value = {question.answer} name = "answer" onChange = {handleSetQuestion} className = "bg-zinc-900 shadow-sm shadow-neutral-100/80 text-sm rounded-lg"  placeholder = "//This is where your respondents will answer." />
}

export default TextQuestion