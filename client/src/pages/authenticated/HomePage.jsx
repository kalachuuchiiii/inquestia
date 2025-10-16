
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
  const [totalSurveys, setTotalSurveys] = useState(0);
  const { isLoading: isSessionLoading, user, isAuthenticated, isProcessOK } = useSelector(state => state.user);

  const [getSurveyList, { isLoading, error }] = useAsync(async ({ page = 1, overwrite = true} = {}) => {
    const res = await fetchApi('get', '/surveys', {
      page, 
      seenIds: JSON.stringify(surveys.map(s => s._id))
    })

   if(!res?.success)return;
    setSurveys(prev => overwrite ? res.surveys : [...prev, ...res.surveys])
    setNextPage(res.nextPage)
    setTotalSurveys(res.totalSurveys);
    
  })

  const { inView, ref } = useInView();

  useEffect(() => {
    if (surveys.length > 0 || isLoading) return;
    getSurveyList();
  }, [])

  useEffect(() => {
    if (
      surveys.length === 0 ||
      nextPage === null ||
      nextPage === 1 ||
      isLoading ||
      !inView
    ) return;
    getSurveyList({ page: nextPage, overwrite: false });
  }, [nextPage, inView]);

  useEffect(() => {
    if (!isProcessOK || isSessionLoading || !isAuthenticated) return;
    if (!user.isFinishedOnboarding  ) {
      nav('/interests');
    }
  }, [user, isSessionLoading, isProcessOK, isAuthenticated])


  if (isSessionLoading || !isProcessOK) {
    return <LoadingDisplay>
       <div className="flex gap-2 items-center">Welcome! Preparing everything for you...</div>
    </LoadingDisplay>
  }


  return (
    <div className="p-2">
      <div className="my-6 space-y-6">
        <Dashboard user={user} />
      </div>
      <div className="space-y-3 min-h-screen">
        {surveys?.length > 0 ? (
          surveys.map((survey) => (
            <SurveyCard survey={survey} key={survey._id}>
              <div className="flex items-start gap-2">
                <SurveyCard.Preview />
                <SurveyCard.Report />
              </div>
              <SurveyCard.Author />
              <SurveyCard.Redirect />

              <SurveyCard.Bar />
            </SurveyCard>
          ))
        ) : totalSurveys === 0 ? (
          <p className=' text-center  opacity-50 w-full'>No surveys are published yet.</p>
        ) : (
          nextPage === null && <p className=' text-center  opacity-50 w-full'>You've reached end.</p>
        )}
        {isLoading && <SurveyCardPlaceholder number={8} />}
      </div>
      <div className="h-1 " ref={ref} />
    </div>
  );
}

export default HomePage