import Textarea from '../../html/Textarea.jsx';
import { IoCheckmark } from "react-icons/io5";
import { SelectAnswerContext } from '../../../context/selectAnswerQuestionContext.js';
import { useState, useCallback } from 'react';
import useCTX from '../../../hooks/useCTX.js';
import Notice from '../../html/Notice.jsx';
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

const SelectAnswerQue = ({ question = {
  choices: [],
  question: '',
  multipleChoice: false,
  answers: [],
}, id = 1, setQuestions = () => { }, className = '', children = null }) => {
  const [choice, setChoice] = useState('');
  const [error, setError] = useState('');

  const handleSetQuestion = useCallback((e) => {
    const { name, value } = e.target;
    setQuestions(prev => prev.map((q, i) => i !== id ? q : ({
      ...q,
      [name]: value
    })))
  }, []);

  const handleToggleMultipleChoice = useCallback(() => {
    setQuestions(prev => prev.map((q, i) => i !== id ? q : ({
      ...q,
      multipleChoice: !q.multipleChoice
    })))
  }, []);
  
  const deselectChoice = useCallback((choice) => {
    setQuestions(prev => prev.map((q, i) => i !== id ? q : {...q, choices: q.choices.filter(c => c !== choice)}));
  }, []);

  const handleAddChoice = useCallback(() => {
    if (question.choices.length === 8) {
      setError('You can only add upto 8 choices.');
      return;
    }
    if (typeof choice !== 'string' || choice.length === 0) {
      setError('You cannot an empty option');
      return;
    }
    if(question.choices.some(c => c.trim().toLowerCase() === choice.trim().toLowerCase())){
      setError(`${choice} is already an option.`);
      return;
    }
    setQuestions(prev => prev.map((q, i) => i !== id ? q : ({
      ...q,
      choices: q.choices.includes(choice) ? q.choices : [...q.choices, choice]
    })))
    setError('');
    setChoice('');
  }, [choice]);

  const handleToggleRequired = useCallback(() => {
    setQuestions(prev => prev.map((q, i) => i !== id ? q : ({
      ...q,
      isRequired: !q.isisRequired
    })))
  }, [])

  return <SelectAnswerContext.Provider value={{
    handleToggleMultipleChoice,
    handleToggleRequired,
    handleAddChoice,
    handleSetQuestion,
    question, 
    choice, 
    setChoice, 
    deselectChoice,
    error, 
    id
  }}>
    <div className = {className}>
          {children}
    </div>
  </SelectAnswerContext.Provider>
}

SelectAnswerQue.QuestionNum = () => {
  const { id = 1 } = useCTX(SelectAnswerContext);
  const num = (id + 1) || 1;

  return <>
    <p >Question {num}</p>
  </>
}

SelectAnswerQue.RequireCheckbox = () => {
  const { question = { isRequired: false }, handleToggleRequired = () => { } } = useCTX(SelectAnswerContext)

  return <div className = "flex gap-1 items-center">
    <div className="text-xs flex gap-1 ">
     <span className="text-red-400">*</span>
     <p>Required</p>
      </div>
    <input onClick={handleToggleRequired} checked={question.isRequired} type="checkbox" />
  </div>
}

SelectAnswerQue.Question = () => {
  const { handleSetQuestion = () => {}, question = { question: '' }} = useCTX(SelectAnswerContext);
  
  return <Textarea onChange={handleSetQuestion} name="question" value={question.question} rows={1} limit={150} placeholder="What's your question?" />
}

SelectAnswerQue.MultipleChoiceButton = () => {
  const { handleToggleMultipleChoice = () => {}, question = { multipleChoice: false }} = useCTX(SelectAnswerContext);
  
  return <div className="flex gap-3 ">
            <input onChange = {handleToggleMultipleChoice} checked = {question.multipleChoice} type = "checkbox" />
        <p className="text-xs">Allow multiple choice </p>
      </div>
}

SelectAnswerQue.Choices = () => {
  const { question = { 
    isRequired: false, 
    choices: [] },
    deselectChoice = () => {}} = useCTX(SelectAnswerContext);
  
  return <div className = "space-y-2">
    <div>
          <div className="text-sm flex gap-1">{question.isRequired && <p className="text-red-400 text-xs">*</p>}Choices</div>
          <Notice className = "text-xs opacity-50">Minimum of 2 choices and maximum of 8</Notice>
    </div>
      <div className="p-2 border-l-1 border-l-neutral-100 flex flex-col gap-1 items-start text-sm">
        {
          question.choices.length > 0 ? question.choices.map(choice => <div className="px-3 animate-pulse bg-neutral-100/50 transition-all flex items-center justify-between duration-200 w-full shrink-0  py-2">
            <p> {choice}</p>
            <button onClick = {() => deselectChoice(choice)}><IoMdClose /></button>
          </div>) : <p className="p-1 opacity-50 ">No options were added yet</p>
        }
      </div>
  </div>
}

SelectAnswerQue.AddOption = () => {
  const { choice = '', setChoice = () => {}, handleAddChoice = () => {}} = useCTX(SelectAnswerContext)
  
  return <div className="flex justify-between items-center">
          <input value={choice} onChange={(e) => setChoice(e.target.value)} placeholder="Add an option here..." className="p-2 w-full outline-none" />
          <button onClick={handleAddChoice} className="text-sm bg-neutral-100 text-zinc-900 rounded p-2"><GoPlus/></button>
        </div>
}

SelectAnswerQue.ErrorDisplay = () => {
  const { error = '' } = useCTX(SelectAnswerContext)
  
  return <>
    { error && <p className = "text-xs text-red-400">{error}</p>}
  </>
}

export default SelectAnswerQue