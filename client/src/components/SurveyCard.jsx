import UserIcon from './UserIcon.jsx';
import { formatIsoString } from '../utils/formatIsoString.js';
import List from './List.jsx';
import { getPercentage } from '../utils/getPercentage.js';

const SurveyCard = ({survey = {}}) => {
  
  const progress = `${getPercentage(survey.targetRespondents, survey.totalRespondents)}%`

return <div className = "p-3 rounded-xl shadow-md">
  <UserIcon className = "flex my-2 gap-3 items-center" user = {survey.user}>
    <UserIcon.Avatar size = "9" />
    <div>
      <UserIcon.Username className = "font-semibold" /> 
      <p className = "text-xs">{formatIsoString(survey.createdAt)}</p>
    </div>
  </UserIcon>
  <div className = "my-4">
      <p className = "text-lg font-semibold">{survey.title}</p>
  <p>{survey.description}</p>
  </div>
  <div className = " border-l-2 bg-blue-50 border-blue-300 rounded-r-lg my-3 mx-3 p-2">
    <p>Q1: {
      survey.questions[0].question
    }</p>
    <p>...</p>
  </div>
  <div className = "w-full space-y-1 text-sm mb-4 mt-8"> 
  <p>{survey.totalRespondents} / {survey.targetRespondents}</p>
  <div className = "w-full shadow-md rounded-xl">
    <div className = {`bg-gradient-to-r from-purple-300 to-pink-200 p-2 w-[${progress}] text-xs text-center`} >
    </div>
  </div>
  <p>Target respondents</p>
  </div>
</div>
}

export default SurveyCard