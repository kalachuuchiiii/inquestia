import { useEffect, useState } from 'react';

const useSurveyForm = () => {
  const [questions, setQuestions] = useState([]); 
  const [surveySummary, setSurveySummary] = useState({
    title: '', 
    description: '', 
    targetRespondents: 8
  })
  const [error, setError] = useState('');
  
  const handleChangeSurveySummary = (e) => {
    const { name, value } = e.target; 
    const validNames = ["description", "title", "targetRespondents"];
    if(!validNames.includes(name))return;
    setSurveySummary(prev => ({
      ...prev, [name]: value
    }))
  }
  
  const addQuestion = (obj) => {
    if(Object.keys(obj).length === 0)return;
    setQuestions(prev => [...prev, obj])
  }
  
  const removeQuestion = (idx) => {
    setQuestions((prev) => prev.filter((quest, i) => idx !== i));
  }
  
  const publishSurvey = () => {
    const TITLE_LIMIT=80; 
    const DESCRIPTION_LIMIT=250;
    const QUESTION_LIMIT=8;
    const TARGET_RESPONDENT_LIMIT=1000;
    if(!surveySummary)return; 
    const { title = '', description = '', targetRespondents = 0 } = surveySummary;
    const parsedTargetRespondents = parseInt(targetRespondents);
    
    if(typeof title !== 'string' || typeof description !== 'string'){
      setError('Invalid Survey Form');
      return;
    }
    
    if(title.length < 6 || description.length < 10){
      setError('Make the survey more engaging!');
      return;
    }
    if(title.length > TITLE_LIMIT){
      setError(`Title length exceeded ${TITLE_LIMIT} character limit`);
      return;
    }
    
    if(description.length > DESCRIPTION_LIMIT){
      setError(`Description length exceeded ${DESCRIPTION_LIMIT} character limit`);
      return;
    }
    
    if(parsedTargetRespondents < 5){
      setError('5 is the lowest number of target respondents available.');
      return;
    }
    
    if(parsedTargetRespondents > TARGET_RESPONDENT_LIMIT){
      setError(`Target respondents shouldn't exceed ${TARGET_RESPONDENT_LIMIT}`);
      return;
    }
    
    if(!Array.isArray(questions)){
      setError('Invalid Questions.');
      return;
    }
    if(questions.length < 1){
      setError('Provide a question or more to continue.');
      return;
    }
    if(questions.length > QUESTION_LIMIT){
      setError(`Question limit reached`);
      return;
    }
    const form = {
      questions, 
      ...surveySummary
    }
    console.log(form);
    setError(false);
    
  }

  
  return {
    questions, 
    error,
    addQuestion, 
    surveySummary,
    handleChangeSurveySummary,
    removeQuestion,
    publishSurvey
  }

}

export default useSurveyForm