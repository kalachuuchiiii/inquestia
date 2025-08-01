import TopicsList from '../../components/TopicsList.jsx';
import CurrentTopic from '../../components/CurrentTopic.jsx';
import SurveyList from '../../components/SurveyList.jsx';
import { useEffect, useState } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery.js';
import { surveys } from '../../data/mockData/surveyList.js';
import Dashboard from '../../components/Dashboard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from '../../state/slice/user.js';
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const { currentParams } = useSearchQuery({
    key: "topic", 
    initial: "technology"
  })

return <div className = "p-2" >
      <Dashboard />
              <SurveyList surveyList = {surveys} />
</div>
}

export default HomePage