
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { fetchApi } from '../../utils/fetchApi.js';
import useAsync from '../useAsync.js';
import useFieldArray from '../useFieldArray.js';

const useAnswerSurvey = () => {
  const { id } = useParams();
const [survey, setSurvey] = useState(null)
const nav = useNavigate();
  const [questionFields, setQuestionFields] = useState([]);

  const [getSurveyById, { isLoading, error, isSuccess}] = useAsync(async () => {
    const res = await fetchApi('get', `/survey/${id}`);
    if (res?.success && res?.survey) {
      setSurvey(res.survey);
      setQuestionFields(res.survey.questions.map((f) => ({...f, answer: f.type === 'select' ? [] : ''})));
    }
  });
  useEffect(() => {
    getSurveyById();
  }, [id])
  
  const { fieldArray, getFieldById, modifyFieldById } = useFieldArray(questionFields, isSuccess);
  
  const [submitAnswer, { isLoading: isSubmissionPending, error: isSubmissionError, isSuccess: isSubmissionFulfilled}] = useAsync(async() => {
  
      
    
    
  const answerFields = fieldArray.map(({ answer, _id, type }) => ({
    questionId: _id,
    answer,
    type,
  }));
    const res = await fetchApi("post", "/answer", {
      answers: answerFields, 
      survey
    });
    
    if(!res?.success)return; 
    nav('/response-history')
    
  }, [survey, fieldArray])

  
  return {
    survey, 
    questionFields,
    getSurveyById, 
    isFetchingFulfilled: isSuccess,
    isFetchingPending: isLoading, 
    isFetchingError: error, 
    modifyFieldById,
    getFieldById, 
    fieldArray, 
    submitAnswer, 
    isSubmissionError, 
    isSubmissionFulfilled, 
    isSubmissionPending
    
  }
}

export default useAnswerSurvey