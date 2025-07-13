import { useEffect, useState } from 'react';

const useAnswerOptions = (option) => {
  const [answer, setAnswer] = useState(null);
  
  const handleChange = (e) => {
    setAnswer(e.target.value);
  }
  
  return { answer, handleChange }
}

export default useAnswerOptions