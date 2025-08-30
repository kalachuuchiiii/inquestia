
import { useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard.jsx';
import { fetchApi } from '../../utils/fetchApi.js';

import { useInView } from 'react-intersection-observer';
import SurveyCard from '../../components/card/SurveyCard.jsx';
import useAsync from '../../hooks/useAsync.js';
import LoadingDisplay from '../../components/html/LoadingDisplay.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import SurveyCardPlaceholder from '../../components/card/placeholders/surveyCardPlaceholder.jsx';
import ArrowButton from '../../components/html/ArrowButton.jsx';


const HomePage = () => {

  const [surveys, setSurveys] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const nav = useNavigate();
  const { isLoading: isSessionLoading, user, isAuthenticated, isProcessOK } = useSelector(state => state.user);

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
  }, [isAuthenticated, user, isSessionLoading, isProcessOK])

  useEffect(() => {
    if ( surveys.length === 0 || nextPage === null || nextPage === 1 || isLoading || !inView) return;
    getSurveyList(nextPage);
  }, [nextPage, isLoading, inView]);

  useEffect(() => {
    if (!isProcessOK || isSessionLoading) return;
    if (!user.isFinishedOnboarding) {
      nav('/interests');
    }
  }, [user, isSessionLoading, isProcessOK, isAuthenticated])


  if (isSessionLoading || !isProcessOK) {
    return <LoadingDisplay>
       <div className="flex gap-2 items-center">Welcome! Preparing everything for you...</div>
    </LoadingDisplay>
  }


  return <div className="p-2" >
    <div className="my-6 space-y-6">
      <Dashboard user={user} />
      <div className="w-full flex justify-start px-6">
        <ArrowButton to="/browse" >Search </ArrowButton>
      </div>
    </div>
    <div className="space-y-2 min-h-screen">
      {
        surveys?.length > 0 && surveys.map(survey => <SurveyCard survey={survey} key={survey._id} >
          <SurveyCard.Preview />
          <SurveyCard.Author />
          <SurveyCard.Redirect />
          <SurveyCard.Bar />
        </SurveyCard  >
        )
      }
      {
        isLoading &&
        <SurveyCardPlaceholder />
      }
    </div>
    <div className="h-1 " ref={ref} />
  </div>
}

export default HomePage