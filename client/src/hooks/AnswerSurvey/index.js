
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchApi } from '../../utils/fetchApi.js';
import useAsync from '../useAsync.js';
import useFieldArray from '../useFieldArray.js';

const useAnswerSurvey = () => {
  const { id } = useParams();
const [survey, setSurvey] = useState(null)
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
    if(!Array.isArray(fieldArray)){
      throw new Error("Invalid fields.");
    }
    for(const field of fieldArray){
      const { type, answer, isRequired } = field; 
      if((type === "select" && !Array.isArray(answer)) || (type === "text" && typeof answer !== "string")){
        throw new Error("Invalid answer.");
      }
      
      console.log(answer, answer.length);
      
      if(isRequired && answer.length === 0){
        throw new Error("Oops!, You missed a required question.");
      }
      
      if(type === "text"){
        continue;
      }
      
      if(!field.multipleChoice && answer.length > 1){
        throw new Error("You can only select multiple answers if the questions allows multiple choice.")
      }
      continue;
    }
    
  const answerFields = fieldArray.map(({ answer, _id, type}) => ({ questionId: _id, answer, type }));
    
    const res = await fetchApi("post", "/answer", {
      answers: answerFields, 
      survey
    });
    console.log(answerFields);
    
    console.log(res);
    
    
  })

  
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