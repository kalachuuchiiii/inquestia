import { useSearchParams } from "react-router-dom"
import useAsync from '../../hooks/useAsync.js'
import { fetchApi } from '../../utils/fetchApi.js';
import { useEffect, useState } from 'react';
import SurveyCard from '../card/SurveyCard.jsx';
import SurveyPlaceholder from '../card/placeholders/surveyCardPlaceholder.jsx';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';


const QuerySurvey = () => {
  const [searchQuery] = useSearchParams();
  const [nextPage, setNextPage] = useState(1);
  const { ref, inView } = useInView();
  const { user = {
    interests: [],
  }, isAuthenticated = false } = useSelector(state => state.user);
  const [totalSurveys, setTotalSurveys] = useState(1);
  const [surveys, setSurveys] = useState([]);
  const [isNoResultsFound, setIsNoResultsFound] = useState(false);

  const [getSurveys, { isLoading, error }] = useAsync(async ({ page = 1, overwrite = true } = {}) => {
    if (!user) return;
    const rand = user?.interests.length > 0 ? Math.floor(Math.random() * user.interests.length) : 0;
    const query = searchQuery.get("q") || user.interests[rand] || "personal";
    const res = await fetchApi("get", `/survey/search/${query}`, {
      page
    });
    if (!res?.success) return;
    setSurveys(prev => overwrite ? res.surveys : [...prev, ...res.surveys])
    setTotalSurveys(res.totalSurveys);
    setIsNoResultsFound(res?.isNoResultsFound)
    setNextPage(overwrite ? 1 : res?.nextPage);
  }, [searchQuery, user, searchQuery.get("q")])

  useEffect(() => {
    if (!isAuthenticated) return;
    getSurveys();
  }, [user, searchQuery, isAuthenticated]);
  
  useEffect(() => {
    if(nextPage === null || isLoading || !inView)return; 
    getSurveys({page: nextPage, overwrite: false});
  }, [inView, ref, nextPage, isLoading])

  return <div className="space-y-1" >
    {
      (!isLoading && isNoResultsFound) ? <div className = "flex justify-center opacity-70 items-center h-96 ">
        No results found
      </div> : surveys?.length > 0 ? surveys.map((s) => <SurveyCard key={s._id} survey={s}>
        <SurveyCard.Preview />
        <SurveyCard.Author />
        <SurveyCard.Redirect />
        <SurveyCard.Bar />
      </SurveyCard>) : totalSurveys === 0 && <p className="w-full h-40 flex text-xl opacity-80 justify-center items-center">Start searching!</p>
    } {
      isLoading && <SurveyPlaceholder number = {1} />
    }
  </div>
}

export default QuerySurvey