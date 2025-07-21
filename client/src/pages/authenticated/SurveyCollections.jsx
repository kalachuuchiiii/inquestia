import SurveyList from '../../components/SurveyList.jsx';
import { surveys } from '../../data/mockData/surveyList.js';

const SurveyCollections = () => {

const mySurvey = surveys.filter(s => s.user.username === 'Kalachuuchiiii');
return <div className = "p-2">
  <div className = "space-y-1 my-6">
      <h1 className = "text-3xl font-bold">Your Surveys</h1>
      <p className = "pl-2">List of the surveys you published.</p>
  </div>
  <SurveyList surveyList = {mySurvey} />
</div>
}

export default SurveyCollections