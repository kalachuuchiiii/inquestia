import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import { fetchApi } from '../../utils/fetchApi';
import AnswerCard from '../../components/card/AnswerCard';
import ArrowButton from '../../components/html/ArrowButton';
import LoadingDisplay from '../../components/html/LoadingDisplay';
import { useSelector } from 'react-redux';

const ViewAnswer = () => {

    const { id } = useParams();
    const [answer, setAnswer] = useState({})
    const { user } = useSelector(state => state.user);

    const [getAnswer, { isLoading, error }] = useAsync(async() => {
        const res = await fetchApi('get', `/answer-by-id/${id}`);
        setAnswer(res.answer)        
    }) 

    useEffect(() => {
        getAnswer();
    }, [id])

    if(!answer){
      return <LoadingDisplay > 
        Please wait...
      </LoadingDisplay>
    }

  return (
    <div className="flex flex-col py-2 w-full justify-start items-start gap-8">
      <AnswerCard showModifyAuthenticityButton getAnswer = {getAnswer} showRedirectToSurvey answer={answer} />
         {answer?.survey?.user === user?._id && (
        <ArrowButton to={`/answer/s/${answer.survey?._id}`}>
          {" "}
          View in Survey Center
        </ArrowButton>
      )}
    </div>
  );
}

export default ViewAnswer