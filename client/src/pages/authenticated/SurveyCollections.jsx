import SurveyList from '../../components/SurveyList.jsx';
import { surveys } from '../../data/mockData/surveyList.js';
import Wave from '../../components/designs/wave/Wave.jsx';

const SurveyCollections = () => {

const mySurvey = surveys.filter(s => s.user.username === 'Kalachuuchiiii');
return <div className = "p-2">
  <div className = "space-y-1  p-2 text-white my-6">
      <h1 className = "text-5xl lato">Your Surveys</h1>
      <p className = "text-black">List of the surveys you published.</p>
  </div>
  <SurveyList surveyList = {mySurvey} />
</div>
}

export default SurveyCollections