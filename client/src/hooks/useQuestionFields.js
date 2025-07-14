import { useEffect, useState, useCallback } from 'react';

const useQuestionFields = ({ initial, surveyId }) => {
  const [questionResponses, setQuestionResponses] = useState([]);
  const [error, setError] = useState(null);
  if (!surveyId) throw new Error("Id must be defined");

  useEffect(() => {
    if (!initial || initial?.length < 1) {
      return;
    }
    const form = initial.map(({ question, id, required, choices }) => {
      return {
        question, 
        allowMultipleChoice: choices?.allowMultipleChoice || false,
        id,
        answer: [],
        required
      }

    })
    setQuestionResponses(form);
  }, [initial]);

  const modifyForm = useCallback(({ answer, id }) => {
    setQuestionResponses(prev => {
      return prev.map((q) => {
        if (q.id !== id) return q;
        
        if(q.answer.includes(answer)){
          const ans = q.answer.filter((a) => a !== answer);
          return { ...q, answer: ans};
        }

        const newAnswer = q?.allowMultipleChoice ? [...q.answer, answer] : [answer];

        return { ...q, answer: newAnswer };
      })
    });
  }, []);

  const validateAnswers = (questionList) => {
    if (!questionList || questionList.length === 0) {
      throw new Error("Questions cannot be null")
    }
    questionList.forEach(({ required, answer }) => {
      if (required && (!answer && answer?.length === 0)) {
        throw new Error("Please answer the questions above");
      }
    })
    setError(false);
    return questionList;
  }

  const submitSurvey = (e) => {
    e.preventDefault();
    try {
      const answerForm = validateAnswers(questionResponses);
      console.log(answerForm);
    } catch (e) {
      setError(e.message);
    }
  }

  const getSurveyQuestionById = (id) => questionResponses.find(q => q.id === id);

  return { questionResponses, getSurveyQuestionById, submitSurvey, modifyForm, error };


}

export default useQuestionFields