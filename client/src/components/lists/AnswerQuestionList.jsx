import TextCard from '../card/answerQuestion/TextCard.jsx';
import SelectCard from '../card/answerQuestion/SelectCard.jsx';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi2";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SliderButton from '../SliderButton.jsx';

const AnswerQuestionList = ({ questionList = [] }) => {
  const [current, setCurrent] = useState(0);
  const questionCard = {
    text: (q, i) => <TextCard question={q} index={i + 1} />, 
    select: (q, i) => <SelectCard question={q} index={i + 1} />
  };
const { mode } = useSelector(state => state.theme)
  const handlePrev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setCurrent((prev) => (prev < questionList.length - 1 ? prev + 1 : prev));
  };

  if (!questionList.length) return null;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-sm px-2 opacity-50 mb-4">
        Questions provided for you:
      </div>
      <div className="flex items-center w-full  justify-between">
        <div className="flex-1 flex min-h-70 justify-center">
          {questionCard[questionList[current].type](
            questionList[current],
            current
          )}
        </div>
      </div>
     <div className='flex flex-col w-full items-center my-4'>
       <SliderButton
        handleNext={handleNext}
        handlePrev={handlePrev}
        current={current}
        last={current === questionList.length - 1}
      />
      <div className="mt-2 text-xs">
        Question {current + 1} of {questionList.length}
      </div>
     </div>
    </div>
  );
}

export default AnswerQuestionList