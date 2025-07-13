import { useEffect, useState } from 'react';
import { optionList } from '../data/optionList.jsx';
import useAnswerOptions from '../hooks/useAnswerOptions.jsx';
import Option from '../components/options/Option.jsx';
import useQuestionField from '../hooks/useQuestionFields.js';

const QuestionCard = ({formField, i, handleChange, answer}) => {
const { question, id, required} = formField;
const qNum = i + 1;


return <div>
  <p className = "text-lg"><span className = "text-red-400">{required && "*"}</span> Q{qNum}: {question}</p>
  <Option formField = {formField} handleChange = {(e) => handleChange({answer: e.target.value, id})} answer = {answer} />
</div>
}

export default QuestionCard