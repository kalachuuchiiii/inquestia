import { useEffect, useState, useCallback } from 'react';

const useQuestionFields = ({initial, surveyId}) => {
const [questionResponses, setQuestionResponses] = useState([]);
const [error, setError] = useState(null);
if(!surveyId)throw new Error("Id must be defined");

useEffect(() => {
  if(!initial || initial?.length < 1){
    return;
  }
  const form = initial.map(({question, id, required}) => ({
    question, 
    id, 
    answer: '', 
    required
  }))
  setQuestionResponses(form);
}, [initial]);

const modifyForm = useCallback(({answer, id}) => {
  setQuestionResponses(prev => prev.map((q) => q.id === id ? { ...q, answer} : q));
}, [initial]); 

const validateAnswers = (questionList) => {
  if(!questionList || questionList.length === 0){
    throw new Error("Questions cannot be null")
  }
   questionList.forEach(({required, answer}) => {
    if(required && !answer){
      throw new Error("Please answer the questions above"); 
    }
  })
  setError(false);
  return questionList;
}

const submitSurvey = (e) => {
  e.preventDefault(); 
  try{
   const answerForm = validateAnswers(questionResponses);
   console.log(answerForm);
  }catch(e){
    console.log(e);
    setError(e.message);
  }
}

const getSurveyQuestionById = (id) => {
  const cpyQuestions = [...questionResponses];
  const [q] = cpyQuestions.filter((que) => que.id === id);
  return q;
}

return { questionResponses, getSurveyQuestionById, submitSurvey,  modifyForm, error};

 
}

export default useQuestionFields