
import { surveys } from '../../data/mockData/surveyList.js';
import Wave from '../../components/designs/wave/Wave.jsx';

const SurveyCollections = () => {

const mySurvey = surveys.filter(s => s.user.username === 'Kalachuuchiiii');
return <div className = "p-2">
  <div className = "space-y-1  p-2 my-6">
      <h1 className = "text-5xl lato">Your Surveys</h1>
      <p >List of the surveys you published.</p>
  </div>
 
</div>
}

export default SurveyCollections