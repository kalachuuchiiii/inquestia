
import { useEffect, useState } from 'react';
import UserIcon from '../../components/UserIcon.jsx';
import user from '../../data/user.js';
import useToggler from '../../hooks/useToggler.js';
import Textarea from '../../components/html/Textarea.jsx';
import NewQuestionModal from '../../components/modals/NewQuestionModal.jsx'
import QuestionList from '../../components/QuestionsList.jsx';
import { AnimatePresence } from 'framer-motion';
import useSurveyForm from '../../hooks/useSurveyForm.js';
import QuestionCard from '../../components/QuestionCard.jsx';
const CreateSurvey = () => {

  const [ isNewQuestionModalOpen, openNewQuestionModal, closeNewQuestionModal ] = useToggler();
  const { questions, addQuestion, removeQuestion, surveySummary, handleChangeSurveySummary,error, publishSurvey } = useSurveyForm();
  


  return (
    <div className = "p-1">
          <AnimatePresence>
      {isNewQuestionModalOpen && <NewQuestionModal createQuestion={(obj) => addQuestion(obj)} onClose={closeNewQuestionModal} />}
    </AnimatePresence>
      <div className="p-3 rounded backdrop-brightness-25">

    <UserIcon className = "p-2" user={user}>
      <UserIcon.Card >
        <p className="text-sm">New Survey</p>
      </UserIcon.Card>
    </UserIcon>
    <div className="my-5 space-y-2">
      <label className = "text-xs">Title</label>
      <input name = "title" value = {surveySummary?.title} onChange = {handleChangeSurveySummary} className="p-2 text-lg  w-full outline-none" placeholder="Add a survey title" />
      <label className = "text-xs">
        Description
      </label>
      <Textarea name = "description" value = {surveySummary?.description} onChange = {handleChangeSurveySummary}  placeholder="Provide a short description of your survey." />
      <div className="flex items-center gap-2">
        <input name = "targetRespondents" onChange = {handleChangeSurveySummary} value = {surveySummary?.targetRespondents} maxLength = {4} minLength = {2} placeholder="10-1000" className="outline-1 text-center rounded w-20 p-1" type="number" />
        <label className="text-xs">Target Respondents</label>

      </div>
    </div>
    <div className="my-2">
      <button onClick={openNewQuestionModal} className="w-full text-center outline-1 outline-blue-400 rounded-xl p-2 text-blue-500">Add Question</button>
    </div>
        <div className = "min-h-[40vh]">
      <QuestionList readOnly questions={questions} renderItem = {(question, i) => <QuestionCard questionData = {question} i = {i}>
        <div className = "w-full flex items-center justify-between">
                   <QuestionCard.Question /> 
                   <QuestionCard.Remove onRemove = {() => removeQuestion(i)} />
        </div>
         <QuestionCard.MultiChoice /> 
         <QuestionCard.RenderOption />
        </QuestionCard > } />
    </div>

    <div className = "my-10 w-full px-6 text-right">
          
  <p className = "text-xs h-6 text-red-400">{error }</p>
    
      <button onClick = {publishSurvey}>
        Publish Survey
      </button>
    </div>
  </div>
    </div>)
}

export default CreateSurvey