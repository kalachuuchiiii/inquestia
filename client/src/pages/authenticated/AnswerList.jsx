import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useAsync from '../../hooks/useAsync.js';
import { useInView } from 'react-intersection-observer';
import { fetchApi } from '../../utils/fetchApi.js';
import AnswerCard from '../../components/card/AnswerCard.jsx';
import ArrowButton from '../../components/html/ArrowButton.jsx';

import { NavLink } from "react-router-dom";

const AnswerListPage = () => {
  const [nextPage, setNextpage] = useState(1);
  const [answers, setAnswers] = useState([])
  const [survey, setSurvey] = useState({})
  const [totalAnswers, setTotalAnswers] = useState(0);
  const { ref, inView } = useInView();
  const { id } = useParams();
  
  const [getAnswers, { isLoading, error }] = useAsync(async({ page = 1, rewrite = true} = {}) => {
    const res = await fetchApi("get", `/answer/s/${id}`, {
      page
    }); 

    setSurvey(res.survey)
    setTotalAnswers(res.totalAnswers);
    setNextpage(res.nextPage);
    setAnswers(prev => !rewrite ? [...prev, ...res.answers] : [...res.answers]);
  });
  
  useEffect(() => {
    getAnswers();
  }, [id])
  
  useEffect(() => {
    if(nextPage === null || isLoading || !inView)return; 
    getAnswers({ page: nextPage, rewrite: false})
  }, [nextPage, isLoading, inView]);
  

return <div>
  {
    totalAnswers > 0 ? <><div className = "p-2">
      <p className = "text-xs">These are the answers for survey: </p>
  <div>
    <p className = "lato text-xl">{survey.title}</p>
    <p>{survey.description}</p>
  </div>
  <div className = "h-20 text-sm flex justify-center items-center">
<ArrowButton to = {`/survey-summary/${survey._id}`} className = "text-sm gap-3">
      Generate a Summary
    </ArrowButton>
  </div>
  </div>
  {
    answers?.length > 0 && answers.map((answer) => <AnswerCard answer = {answer} key = {answer._id} /> )
  }</> : !isLoading && <div className = "h-96 flex justify-center items-center" >
    There are no responses yet for this survey.
  </div>
  }
</div>
}

export default AnswerListPage