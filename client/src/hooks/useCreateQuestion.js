import { useState, useCallback } from 'react';
import { norm } from '../utils/norm.js';

const useCreateQuestion = () => {
  const [isCustomOptions, setIsCustomOptions] = useState(false);
  const [option, setOption] = useState('');
  const [showOptionManager, setShowOptionManager] = useState(false);
  const [quest, setQuest] = useState({
    question: "",
    option: "text",
    choices: {
      allowMultipleChoice: false,
      list: []
    }
  })
  const [error, setError] = useState('');
  
  const removeOption = (optionValue) => {
    setQuest(prev => {
      if(prev.option === "text")return;
      const remainingChoices = prev.choices.list.filter(({value}) => value !== optionValue);
      return {
        ...prev, 
        choices: {
          ...prev.choices,
          list: remainingChoices
        }
      }
    })
  }

  const handleAddOption = useCallback(() => {
    const label = option;
    const value = norm(option);
    if(!label || !value)return;
    setQuest(prev => {
      return {
        ...prev,
        choices: {
          ...prev.choices,
          list: [...prev.choices.list, {
            label,
            value
          }]
        }
      }
    })
    setOption('');
  }, [option]);

  const handleChangeCustomOptions = (e) => {
    const { value, name } = e.target;
    const isTrue = value === "true" && name === "custom";
    if(!isTrue){
      setQuest(prev => ({...prev,
    option: "text",
    choices: {
      list: [], 
      allowMultipleChoice: false
    }}))
    setIsCustomOptions(false);
    return;
    }
    setQuest(prev => ({...prev,
    option: "custom"
    }));
    setIsCustomOptions(true);
  }
  
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setQuest(prev => ({
      ...prev, 
      [name]: value
    }))
  }, []);
  
  const toggleMultipleChoice = () => {
    setQuest(prev => ({
      ...prev, choices: {
        ...prev.choices, 
        allowMultipleChoice: !prev.choices.allowMultipleChoice
      }
    }))
  }
  
  const toggleRequired = () => {
    setQuest(prev => ({
      ...prev, 
      required: !prev.required
    }))
  }
  
  const validateQuestionForm = (question = {}, callback = () => {}) => {
    if(!question || typeof question !== 'object'){
      setError('Invalid question');
      return;
    }
    if(!question.question || question.question.length < 6){
      setError("Please provide more info about the question.");
      return;
    }
    if(question.option !== "custom"){
      callback();
      return;
    }
    if(question.choices.list.length < 2){
      setError("Please provide at least 2 valid option");
      return;
    }
    callback();
    setError('');
  }

return {
  isCustomOptions, 
  showOptionManager, 
  handleChange, 
  error,
  validateQuestionForm,
  handleChangeCustomOptions, 
  quest, 
  option, 
  toggleRequired,
  setOption,
  handleAddOption,
  setShowOptionManager, 
  removeOption, 
  toggleMultipleChoice
}
}

export default useCreateQuestion