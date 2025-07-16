import TemplateList from '../../components/template/TemplateList.jsx';
import Option from '../../components/options/Option.jsx';
import { useEffect, useState } from 'react';
import UserIcon from '../../components/UserIcon.jsx';
import user from '../../data/user.js';
import NewQuestionList from '../../components/newQuestion/newQuestionList.jsx'
import useToggler from '../../hooks/useToggler.js';
import NewQuestionModal from '../../components/modals/NewQuestionModal.jsx';
import { AnimatePresence } from 'framer-motion';
import useCreateSurvey from '../../hooks/useCreateSurvey.js';

const CreateSurvey = () => {

  const { open, isOpen, close } = useToggler();
  const { questions, handleAddQuestion } = useCreateSurvey();


  return <div className="p-3">
    <AnimatePresence>
      {isOpen && <NewQuestionModal createQuestion = {handleAddQuestion} onClose = {close} />}
    </AnimatePresence>
    <UserIcon user={user}>
      <UserIcon.Card >
        <p className="text-sm">New Survey</p>
      </UserIcon.Card>
    </UserIcon>
    <div>
      <button onClick={open} className="w-full text-center rounded-xl p-2 bg-blue-50 outline-1 outline-blue-100">Add Question</button>
    </div>
  </div>
}

export default CreateSurvey