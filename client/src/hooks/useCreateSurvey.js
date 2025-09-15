import { useState, useEffect, useCallback } from 'react';
import useAsync from './useAsync.js';
import useToggler from './useToggler.js';
import { fetchApi } from '../utils/fetchApi.js';

import { useParams, useNavigate } from "react-router-dom";
import { genders } from '../data/genders.js';


const surveyInitialState = {
   title: '',
    description: '',
    targetRespondents: 8,
    tags: [], 
    ageGroup: {
      minAge: 8, 
      maxAge: 120
    },
    genderGroup: genders
}

const useCreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const nav = useNavigate();
  const [surveyTagline, setSurveyTagline] = useState(surveyInitialState);

  const handleChangeAgeGroup = (e) => {
    const { name, value } = e.target;
    setSurveyTagline((prev) => ({
      ...prev, ageGroup: {
        ...prev.ageGroup, 
        [name]: value
      }
    }))

  
    } 


  const { id } = useParams();





  const [isModalOpen, openModal, closeModal, toggleModal] = useToggler();
  const addQuestion = (preset) => {
    setQuestions(prev => [...prev, { ...preset }]);
  }
  const [publishSurvey, { isLoading: isPublishingPending, isPublishSuccess, error }] = useAsync(async () => {
    const res = await fetchApi('post', '/survey/create', {
      survey: {
        ...surveyTagline,
        targetRespondents: parseInt(surveyTagline.targetRespondents),
        ageGroup: {
          minAge: parseInt(surveyTagline?.ageGroup?.minAge || '8'),
           maxAge: parseInt(surveyTagline?.ageGroup?.maxAge || '120')
        },
        questions,
      },
      _id: id,
      isDraft: false
    }); 
    
    if(!res?.success)return; 
    nav("/profile");
    
  })

  const [saveSurveyAsDraft, { isLoading: isSavingAsDraft, isDraftSuccess, error: draftError }] = useAsync(async () => {
    await fetchApi('post', '/survey/create', {
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
    console.log(res.survey)
    if (res?.survey) {
      const { questions = [],...surveyInitialState   } = res.survey;
      setQuestions(questions);
      setSurveyTagline({
       ...surveyInitialState
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

  const handleChangeGender = (e) => {
    const { value } = e.target;
    const isAlreadySelected = surveyTagline.genderGroup.includes(value);
    const newGenders = isAlreadySelected
      ? surveyTagline.genderGroup.filter((g) => g !== value)
      : [...surveyTagline.genderGroup, value];

    setSurveyTagline(prev => ({
      ...prev, genderGroup: newGenders
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
    openModal,
    handleChangeGender,
    isPublishSuccess,
    isDraftSuccess,
    publishSurvey,
    handleChangeAgeGroup,
    isDraftLoading
  }
}

export default useCreateSurvey