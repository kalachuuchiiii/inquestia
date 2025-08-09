import { useState, useMemo, useCallback } from 'react';
import useAsync from './useAsync.js';
import { useSelector } from 'react-redux';
import useToggler from './useToggler.js';
import { fetchApi } from '../utils/fetchApi.js';
const useCreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [surveyTagline, setSurveyTagline] = useState({
    title: '',
    description: '',
    targetRespondents: 8,
    tags: []
  });
  const [isModalOpen, _, closeModal, toggleModal] = useToggler();
  const addQuestion = (preset) => {
    setQuestions(prev => [...prev, { ...preset }]);
  }
  const [publishSurvey, { isLoading, error }] = useAsync(async() => {
    const res = await fetchApi('post', '/survey/create', {
       survey: {
         ...surveyTagline, 
         questions
       }
    })
    console.log(res);
  })

  const handleChangeTagline = (e) => {
    const { name, value } = e.target;
    setSurveyTagline(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const deselectTag = useCallback((value) => {
    const remainingTags = surveyTagline.tags.filter(val => val !== value);
    setSurveyTagline(prev => ({
      ...prev,
      tags: remainingTags
    }))
  }, [surveyTagline]);

  const selectTag = useCallback((value) => {
    if (surveyTagline.tags.includes(value)) {
      deselectTag(value);
      return;
    }
    if (surveyTagline.tags.length === 5) {
      return;
    }
    setSurveyTagline(prev => ({
      ...prev,
      tags: [...prev.tags, value]
    }))
  }, [surveyTagline]);


  

  return {
  surveyTagline, 
  closeModal,
  addQuestion, 
  isModalOpen, 
  handleChangeTagline,
  selectTag,
  setQuestions,
  questions,
  isLoading,
  error,
  toggleModal, 
  publishSurvey
  }
}

export default useCreateSurvey