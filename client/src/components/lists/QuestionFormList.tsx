import TextCard from "../card/answerQuestion/TextCard.js";
import SelectCard from "../card/answerQuestion/SelectCard.js";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi2";
import { useMemo, useState } from "react";
import SliderButton from "../SliderButton.js";
import type {
  QuestionDTO,
  SelectTypeQuestionDTO,
  TextTypeQuestionDTO,
} from "@shared/index.js";

const QuestionFormList = ({ questions = [] }: { questions: QuestionDTO[] }) => {
  const [current, setCurrent] = useState(0);

  const questionCardProps = useMemo(() => {
    return {
      question: questions[current],
      index: current + 1,
    };
  }, [current, questions]);

  const QuestionCard = () =>
    questions[current].type === "select" ? (
      <SelectCard {...questionCardProps} />
    ) : (
      <TextCard {...questionCardProps} />
    );

  const handlePrev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
  };

  if (!questions.length) return null;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-sm px-2 opacity-50 mb-4">
        Questions provided for you:
      </div>
      <div className="flex items-center w-full  justify-between">
        <div className="flex-1 flex min-h-70 justify-center">
          <QuestionCard />
        </div>
      </div>
      <div className="flex flex-col w-full items-center my-4">
        <SliderButton
          handleNext={handleNext}
          handlePrev={handlePrev}
          current={current}
          last={current === questions.length - 1}
        />
        <div className="mt-2 text-xs">
          Question {current + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
};

export default QuestionFormList;
