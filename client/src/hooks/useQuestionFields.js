import { useEffect, useState, useCallback } from 'react';

const useQuestionFields = ({ initial, surveyId }) => {
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState(null);
  if (!surveyId) throw new Error("Id must be defined");

  useEffect(() => {
    if (!initial || initial?.length < 1) {
      return;
    }
    const form = initial.map((question) => {
      const { required, option } = question;
      const questionId = question._id;
      
      const allowMultipleChoice = question?.choices?.allowMultipleChoice || false;
      const choices = question?.choices?.list || [];
      
      return {
        questionId,
        answer: option === "text" ? "" : [],
        allowMultipleChoice,
        required, 
        option, 
        choices
      }

    })
    setResponses(form);
  }, [surveyId]);

  const modifyForm = useCallback(({ answer, questionId }) => {
    setResponses(prev => {
      return prev.map((respo) => {
        if (respo.questionId !== questionId) return respo;
        
        if(respo.option === "text"){
          return {...respo, answer };
        }
        
        if(respo.answer.includes(answer)){
          const ans = respo.answer.filter((a) => a !== answer);
          return { ...respo, answer: ans};
        }

        const newAnswer = respo?.allowMultipleChoice ? [...respo.answer, answer] : [answer];

        return { ...respo, answer: newAnswer };
      })
    });
  }, []);

  const validateAnswers = (questionList) => {
    if (!questionList || questionList.length === 0) {
      throw new Error("Questions cannot be null")
    }
    questionList.forEach(({ required, option, answer }) => {
       if(!required)return; 
       if(option === "text" && !answer.trim()){
         throw new Error("Please answer the questions above");
       }
       if(!answer || !answer.length || answer.length === 0){
         throw new Error("Please answer the questions above");
       }
    })
    setError(false);
    return questionList;
  }

  const submitSurvey = (e) => {
    e.preventDefault();
    try {
      const answerForm = validateAnswers(responses).map(({questionId, surveyId, answer, option,choices, allowMultipleChoice}) => {
        return {
          questionId, 
          answer, 
          choices, 
          option,
          allowMultipleChoice
        }
      })
      const answerDoc = {
        surveyId,
        answers: answerForm
      }
      console.log(answerDoc);
    } catch (e) {
      setError(e.message);
    }
  }

  const getSurveyQuestionById = (questionId) => responses.find(respo => respo.questionId === questionId);

  return { responses, getSurveyQuestionById, submitSurvey, modifyForm, error };


}

export default useQuestionFields