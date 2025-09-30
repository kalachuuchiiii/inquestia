import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { useSelector } from "react-redux";
import Textarea from "./html/Textarea";


const QuestionFilter = ({ questions = [], getFieldById = () => {}, handleChange = () => {}}) => {
  const [current, setCurrent] = useState(0);
  const { mode } = useSelector(state => state.theme)

  const handlePrev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () => setCurrent((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
const q = questions?.[current] || {
  type: "text",
  question: "No questions available",
  choices: [],
  answer: ['']
};

  return (
    <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow items-center w-full mb-6">
      <div className="mb-6 w-full text-left border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          📊 Filter by Question Answer
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of responses for each question with selectable options.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Use the arrows to navigate between questions and filter answers.
        </p>
        <p className="text-xs text-blue-500 dark:text-blue-300 mt-2">
          <strong>Strict option filter:</strong> If enabled, only survey answers that exactly match your selected options will be shown. If disabled, answers that contain at least one of your selected options or keywords will be included.
        </p>
        
      </div>
      <div className="flex items-center w-full ">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-40"
          aria-label="Previous question"
        >
          <HiOutlineChevronLeft
            size={28}
            color={mode === "Dark" ? "#fff" : "#222"}
          />
        </button>
        <div className="flex-1 flex flex-col h-56 px-6 justify-between">
          <div className="text-base font-medium text-center text-gray-800 dark:text-gray-100 mb-4">
            {q.question}
            
          </div>
         
          <div className="w-full mx-auto">
            {q.type === "text" ? (
              <Textarea
                value={getFieldById(q?._id)?.answer}
                onChange={(e) =>
                  handleChange(
                    (prev) => ({ ...prev, answer: e.target.value }),
                    q._id
                  )
                }
                placeholder="Type your answer..."
                className="w-full min-h-[80px] rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <div className="flex flex-col gap-2">
                {q.choices &&
                  q.choices.map((choice, idx) => {
                    const isSelected = getFieldById(q._id).answer.includes(
                      choice
                    );
                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 cursor-pointer rounded px-2 py-1 transition ${
                          isSelected
                            ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium"
                            : "opacity-70"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) =>
                            handleChange(
                              (prev) => ({
                                ...prev,
                                answer: prev.answer.includes(choice)
                                  ? prev.answer.filter((ans) => ans !== choice)
                                  : [...prev.answer, choice],
                              }),
                              q._id
                            )
                          }
                        />
                        <span className="text-gray-700 dark:text-gray-200">
                          {choice}
                        </span>
                      </label>
                    );
                  })}
              </div>
            )}
          </div>
           <div className="flex gap-2 items-center">
            <input
              onChange={(e) =>
                handleChange((prev) => ({ ...prev, isStrict: !prev.isStrict }), q._id)}
              id="strict"
              type="checkbox"
              checked={getFieldById(q._id)?.isStrict}
            />
            <label className="text-sm" htmlFor="strict">
              Strict option
              <p></p>
            </label>
          </div>
        </div>
        <button
          onClick={handleNext}
          disabled={current === questions.length - 1}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-40"
          aria-label="Next question"
        >
          <HiOutlineChevronRight
            size={28}
            color={mode === "Dark" ? "#fff" : "#222"}
          />
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Question <span className="font-semibold">{current + 1}</span> of{" "}
        <span className="font-semibold">{questions.length}</span>
      </div>
    </div>
  );
};

export default QuestionFilter;