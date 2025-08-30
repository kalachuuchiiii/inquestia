import { useState, useMemo, useEffect, useCallback } from 'react';
import useAsync from './useAsync.js';
import { useSelector } from 'react-redux';
import useToggler from './useToggler.js';
import { fetchApi } from '../utils/fetchApi.js';

import { useParams, useNavigate } from "react-router-dom";

const useCreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const nav = useNavigate();
  const [surveyTagline, setSurveyTagline] = useState({
    title: '',
    description: '',
    targetRespondents: 8,
    tags: []
  });
  const { id } = useParams();



  const [isModalOpen, _, closeModal, toggleModal] = useToggler();
  const addQuestion = (preset) => {
    setQuestions(prev => [...prev, { ...preset }]);
  }
  const [publishSurvey, { isLoading: isPublishingPending, isPublishSuccess, error }] = useAsync(async () => {
    const res = await fetchApi('post', '/survey/create', {
      survey: {
        ...surveyTagline,
        questions,
      },
      _id: id,
      isDraft: false
    }); 
    
    if(!res?.success)return; 
    nav("/profile");
    
  })

  const [saveSurveyAsDraft, { isLoading: isSavingAsDraft, isDraftSuccess, error: draftError }] = useAsync(async () => {
    const res = await fetchApi('post', '/survey/create', {
      survey: {
        ...surveyTagline,
        questions,
      },
      _id: id,
      isDraft: true
    })
    nav("/profile/drafts");
  })

  const [getDraft, { isLoading: isDraftLoading }] = useAsync(async () => {
    const res = await fetchApi("get", `/survey/${id}`);
    if (res?.survey) {
      const { questions = [], title = '', tags = [], description = '', targetRespondents = 8 } = res.survey;
      setQuestions(questions);
      setSurveyTagline({
        title,
        description,
        targetRespondents,
        tags
      })
    }
  })

  useEffect(() => {
    getDraft();
  }, [id])

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
    isPublishingPending,
    saveSurveyAsDraft,
    isSavingAsDraft,
    error,
    toggleModal,
    draftError,
    isPublishSuccess,
    isDraftSuccess,
    publishSurvey
  }
}

export default useCreateSurvey