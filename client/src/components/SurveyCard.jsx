import UserIcon from './UserIcon.jsx';
import { formatIsoString } from '../utils/formatIsoString.js';
import List from './List.jsx';
import { getPercentage } from '../utils/getPercentage.js';
import { NavLink } from "react-router-dom";
import { createContext, useContext } from 'react';

const SurveyCardContext = createContext();
const SurveyCard = ({ survey = {}, question, children }) => {
  return <SurveyCardContext.Provider value = {{survey, question}}>

    <div className="p-3 rounded-xl shadow-md">
      {children}
    </div>
  </SurveyCardContext.Provider>
}

SurveyCard.TargetRespondents = () => {

  const { survey } = useContext(SurveyCardContext);
  const progress = `${getPercentage(survey.targetRespondents, survey.totalRespondents)}%`

  return <div className="w-full space-y-1 text-sm mb-4 mt-8">
    <p>{survey.totalRespondents} / {survey.targetRespondents}</p>
    <div className="w-full shadow-md rounded-xl">
      <div className={`bg-gradient-to-r from-purple-300 to-pink-200 p-2 w-[${progress}] text-xs text-center`} >
      </div>
    </div>
    <p>Target respondents</p>
  </div>
}

SurveyCard.QuestionPreview = () => {
  const { question } = useContext(SurveyCardContext);

  return <div className=" border-l-2 bg-blue-50 border-blue-300 rounded-r-lg my-3 mx-3 p-2">
    <p className="active:underline">Q1: {
      question?.question
    }</p>
    <p>...</p>
  </div>
}

SurveyCard.Header = () => {
  const { survey } = useContext(SurveyCardContext);

  return <div className="my-4">
    <NavLink to={`/survey/${survey._id}`} className="text-lg font-semibold">{survey.title}</NavLink>
    <p>{survey.description}</p>
  </div>
}

SurveyCard.User = () => {
  const { survey } = useContext(SurveyCardContext);

  return <UserIcon className="flex my-2 gap-3 items-center" user={survey?.user}>
    <UserIcon.Avatar size="9" />
    <div>
      <UserIcon.Username className="font-semibold" />
      <p className="text-xs">{formatIsoString(survey?.createdAt)}</p>
    </div>
  </UserIcon>

}

export default SurveyCard