import TopicsList from '../../components/TopicsList.jsx';
import CurrentTopic from '../../components/CurrentTopic.jsx';
import SurveyList from '../../components/SurveyList.jsx';
import { useEffect, useState } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery.js';
import { surveys } from '../../data/mockData/surveyList.js';
import Dashboard from '../../components/Dashboard.jsx';

const HomePage = () => {
  
  const [surveyList, setSurveyList] = useState([]);
  const [currTopic, setCurrTopic] = useState("Technology");
  const { currentParams } = useSearchQuery({
    key: "topic", 
    initial: "technology"
  })
  
  
  useEffect(() => {
    const matcher = () => {
   const d = surveys.filter(q => q.topics.includes(currentParams || "technology"));
   setSurveyList(d);
  }
    matcher();
  }, [currentParams, currTopic])
  

return <div className = "p-2" >
      <Dashboard />

              <SurveyList surveyList = {surveyList} />
      
</div>
}

export default HomePage