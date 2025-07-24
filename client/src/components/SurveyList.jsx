import List from './List.jsx';
import SurveyCard from './SurveyCard.jsx';
import { surveys } from '../data/mockData/surveyList.js';
import { memo } from 'react';
import { questions } from '../data/mockData/questions.js';

const SurveyList = ({surveyList = surveys}) => {
  
  const prevQuestion = (surveyId) => {
   const question = questions.find((quest) => quest.surveyId === surveyId);
   return question;
  }

return <div className = "w-full">
  <List className = "flex  flex-col justify-center items-center gap-3 " list = {surveyList} renderItem = {(survey) => <SurveyCard question = {
  prevQuestion(survey._id)
  } survey = {survey} >
    <SurveyCard.User />
    <SurveyCard.Header />
    <SurveyCard.QuestionPreview />
    <SurveyCard.TargetRespondents />
  </SurveyCard>} />
</div>
}

export default memo(SurveyList);