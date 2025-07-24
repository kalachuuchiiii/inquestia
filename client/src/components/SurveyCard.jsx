import UserIcon from './UserIcon.jsx';
import { formatIsoString } from '../utils/formatIsoString.js';
import List from './List.jsx';
import { getPercentage } from '../utils/getPercentage.js';
import { NavLink } from "react-router-dom";
import { createContext, useContext } from 'react';
import Bar from './html/Bar.jsx';
import useCtx from '../hooks/useCTX.js';

const SurveyCardContext = createContext();
const SurveyCard = ({ survey = {}, question, children }) => {
  return <SurveyCardContext.Provider value = {{survey, question}}>

    <div className="p-3 backdrop-brightness-50 rounded-xl shadow-md">
      {children}
    </div>
  </SurveyCardContext.Provider>
}

SurveyCard.TargetRespondents = () => {

  const { survey = {
    targetRespondents: 100, 
    totalRespondents: 50
  } } = useCtx(SurveyCardContext);
  
  return <div>
    <Bar target = {survey.targetRespondents} total = {survey.totalRespondents} />
    <p className = "text-xs">Target Respondents</p>
  </div>
}

SurveyCard.QuestionPreview = () => {
  const { question = {
    question: '...?'
  } } = useCtx(SurveyCardContext);

  return <div className=" rounded-r-lg my-3 mx-3 p-2">
    <p className="active:underline italic">Q1: {
      question?.question
    }</p>
    <p>...</p>
  </div>
}

SurveyCard.Header = () => {
  const { survey = {
    _id: null, 
    title: '...', 
    description: '...'
  } } = useCtx(SurveyCardContext);

  return <div className="my-4">
    <NavLink to={`/survey/${survey?._id}`} className="text-lg font-semibold">{survey?.title}</NavLink>
    <p>{survey?.description}</p>
  </div>
}

SurveyCard.User = () => {
  const { survey = {
    user: {
      avatar: '', 
      username: 'guest',
      _id: null, 
      createdAt: new Date().toISOString()
    }
  } } = useCtx(SurveyCardContext);

  return <UserIcon className="flex my-2 gap-3 items-center" user={survey?.user}>
    <UserIcon.Avatar size="9" />
    <div>
      <UserIcon.Username className="font-semibold" />
      <p className="text-xs">{formatIsoString(survey?.createdAt)}</p>
    </div>
  </UserIcon>

}

export default SurveyCard