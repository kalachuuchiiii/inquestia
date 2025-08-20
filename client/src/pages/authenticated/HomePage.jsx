import TopicsList from '../../components/TopicsList.jsx';
import CurrentTopic from '../../components/CurrentTopic.jsx';
import { useEffect, useState } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery.js';
import Dashboard from '../../components/Dashboard.jsx';
import { fetchApi } from '../../utils/fetchApi.js';

import { useInView } from 'react-intersection-observer';
import SurveyCard from '../../components/card/SurveyCard.jsx';
import useAsync from '../../hooks/useAsync.js';
import LoadingDisplay from '../../components/html/LoadingDisplay.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import SurveyCardPlaceholder from '../../components/card/placeholders/surveyCardPlaceholder.jsx';

const HomePage = () => {
  const { currentParams } = useSearchQuery({
    key: "topic",
    initial: "technology"
  })
  const [surveys, setSurveys] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const nav = useNavigate();
  const { isLoading: isSessionLoading, user, authenticated, isProcessOK } = useSelector(state => state.user);

  const [getSurveyList, { isLoading, error }] = useAsync(async (page = 1) => {
    const seenSurveys = [...surveys];
    const res = await fetchApi('get', '/surveys', {
      seenSurveys,
      page
    })
    const uniqueSurveys = res.surveys.filter(s => !seenSurveys.some(survey => survey._id === s._id));
    setNextPage(res.nextPage);
    setSurveys(prev => [...prev, ...uniqueSurveys]);
  })

  const { inView, ref } = useInView();

  useEffect(() => {
    if (surveys.length > 0) return;
    getSurveyList();
  }, [])

  useEffect(() => {
    if (surveys.length === 0 || nextPage === null || nextPage === 1 || isLoading || !inView) return;
    getSurveyList(nextPage);
  }, [nextPage, isLoading, inView]);
  
  useEffect(() => {
    if(!isProcessOK || isSessionLoading)return;
    
    if(user.isFinishedOnboarding)return;
    //return nav("/interests");
    
  }, [user, isSessionLoading, isProcessOK, authenticated])
  
  if(isSessionLoading || !isProcessOK){
    return <LoadingDisplay message = "Setting everything up for you..." />
  }
  

  return <div className="p-2" >
    <Dashboard />
    <div className="space-y-2 min-h-screen">
      {
        surveys?.length > 0 && surveys.map(survey => <SurveyCard survey={survey} key={survey._id} />)
      }
      {
        isLoading && <div className="h-64 w-64 flex flex-col w-full [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]">
             <SurveyCardPlaceholder />
        </div>
      }
    </div>
    <div className="h-1 " ref={ref} />
  </div>
}

export default HomePage