import TopicsList from '../../components/TopicsList.jsx';
import CurrentTopic from '../../components/CurrentTopic.jsx';
import { useEffect, useState } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery.js';
import Dashboard from '../../components/Dashboard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from '../../state/slice/user.js';
import { useNavigate } from "react-router-dom"
import { fetchApi } from '../../utils/fetchApi.js';
import useAsync from '../../hooks/useAsync.js';
import { useInView } from 'react-intersection-observer';
import SurveyCard from '../../components/card/SurveyCard.jsx';

const HomePage = () => {
  const { currentParams } = useSearchQuery({
    key: "topic", 
    initial: "technology"
  })
  
  const [surveys, setSurveys] = useState([])
  const [nextPage, setNextPage] = useState(1);
  const [page, setPage] = useState(1);
  const [getSurvey, { isLoading, error }] = useAsync(async() => {
    if(nextPage === null)return;
    const res = await fetchApi('get', '/survey', {
      seenSurveys: surveys,
      page
    })
    if(res?.surveys?.length > 0){
      setSurveys(prev => [...prev, ...res.surveys]);
      setNextPage(res.nextPage)
    }
  }) 
  
  const { inView, ref } = useInView();
  
  useEffect(() => {
    if(inView && nextPage !== null){
      setPage(prev => prev + 1);
    }
  }, [inView])
  
  useEffect(() => {
    if(nextPage === null && inView)return;
    getSurvey(page);
  }, [page])
  
  
  
  

return <div className = "p-2" >
      <Dashboard />
      <div className = "space-y-2">
       {
      surveys?.length > 0 && surveys?.map((s) => <SurveyCard survey = {s} key = {s._id} />)
      }
      </div>
      <div ref = {ref} />
</div>
}

export default HomePage