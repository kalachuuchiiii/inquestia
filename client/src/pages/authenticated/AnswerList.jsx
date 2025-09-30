import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi2";
import { useSelector } from 'react-redux';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import useAsync from '../../hooks/useAsync.js';
import { useInView } from 'react-intersection-observer';
import { fetchApi } from '../../utils/fetchApi.js';
import AnswerCard from '../../components/card/AnswerCard.jsx';
import ArrowButton from '../../components/html/ArrowButton.jsx';
import SurveyStatistics from '../../components/SurveyStatistics.jsx';
import { NavLink } from "react-router-dom";
import QuestionFilter from "../../components/QuestionFilter.jsx";
import useFieldArray from "../../hooks/useFieldArray.js";
import Button from "../../components/html/Button.jsx";

const AnswerListPage = () => {
  const [nextPage, setNextpage] = useState(1);
  const [answers, setAnswers] = useState([])
  const [survey, setSurvey] = useState({})
  const [totalAnswers, setTotalAnswers] = useState(0);
  const { fieldArray: questions, modifyFieldById, getFieldById, setFieldArray } = useFieldArray([]);
  const [statistics, setStatistics] = useState([]);
  const { ref, inView } = useInView();
  const [isFilterOn, setIsFilterOn] = useState(false)
  const { id } = useParams();
  const filterObject = useMemo(() => ({ questions}), [ questions])
  
  const [getAnswers, { isLoading, error }] = useAsync(async({ page = 1, overwrite = true, turnOnFilter = false} = {}) => {
    const res = await fetchApi("get", `/answer/s/${id}`, {
      page, 
      filter: JSON.stringify(turnOnFilter ? filterObject : null) 
    }); 
    setIsFilterOn(turnOnFilter)
    
    console.log(res)
    setTotalAnswers(res.totalAnswers);
    setNextpage(res.nextPage);
    setAnswers(prev => !overwrite ? [...prev, ...res.answers] : [...res.answers]);
  }, [isFilterOn, questions]);


  const [getStatistics] = useAsync(async() => {
    const res = await fetchApi("get", `/survey/${id}/statistics`); 
    if(!res.success)return;
    setSurvey(res.survey)
     setFieldArray(
       res.survey.questions.map((q) => ({
         ...q,
         answer: q.type === "text" ? "" : [],
         isStrict: false,
       }))
     );
    setStatistics(res.statistics);
  })

 
 


  
  useEffect(() => {
    getStatistics();
    getAnswers();
  }, [id])
  
  useEffect(() => {
    if(nextPage === null || isLoading || !inView)return; 
    getAnswers({ page: nextPage, overwrite: false, turnOnFilter: isFilterOn})
  }, [nextPage, inView]);
  

return (
  <div>
    <div className="p-4">
      <p className="lato text-xl">{survey.title}</p>
      <p>{survey.description}</p>
    </div>
    {statistics?.length > 0 && <SurveyStatistics data={statistics} />}
    {survey?.questions?.length > 0 && (
      <>
        <QuestionFilter
         
          getFieldById={getFieldById}
          handleChange={modifyFieldById}
          questions={survey.questions}
        />
        <div className="space-y-4">
          <Button onClick={() => getAnswers({ turnOnFilter: true })}>
            Filter
          </Button>
          <Button onClick={() => getAnswers({ turnOnFilter: false })}>
            Remove Filter
          </Button>
        </div>
      </>
    )}
    {totalAnswers > 0 ? (
      <>
        <div className="w-full">
          <div className="h-20 text-sm flex justify-center items-center">
            <ArrowButton
              to={`/survey-summary/${survey._id}`}
              className="text-sm gap-3"
            >
              Generate a Summary
            </ArrowButton>
          </div>
        </div>
        <p className="text-xs">These are the answers for survey: </p>

        {totalAnswers > 0 && answers?.length > 0 &&
          answers.map((answer) => (
            <AnswerCard answer={answer} key={answer._id} />
          ))}
      </>
    ) : (
      !isLoading && (
        <div className="h-96 flex justify-center items-center">
          There are no responses yet for this survey.
        </div>
      )
    )}
    <div ref={ref} className="h-2" />
  </div>
);
}

export default AnswerListPage