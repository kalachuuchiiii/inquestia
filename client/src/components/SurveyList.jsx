import List from './List.jsx';
import SurveyCard from './SurveyCard.jsx';
import { surveys } from '../data/mockData/surveyList.js';
import { memo } from 'react';

const SurveyList = ({surveyList = surveys}) => {


return <div>
  <List list = {surveyList} renderItem = {(survey) => <SurveyCard survey = {survey} />} />
</div>
}

export default memo(SurveyList);