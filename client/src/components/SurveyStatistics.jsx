import React, { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { useSelector } from "react-redux";

const SurveyStatistics = ({ data = null }) => {
  const [current, setCurrent] = useState(0);
  const { mode } = useSelector(state => state.theme)

  return (
    <div className="shadow-lg rounded-2xl p-6 bg-neutral-50 w-full dark:bg-gray-800 my-6">
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          📊 Survey Statistics
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of responses for each question with selectable options.
        </p>
      </div>
      {data ? (
        data.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full  justify-between mb-4">
              <button
                onClick={() =>
                  setCurrent((prev) => (prev > 0 ? prev - 1 : prev))
                }
                disabled={current === 0}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-30"
                aria-label="Previous statistic"
              >
                <HiOutlineChevronLeft
                  size={28}
                  color={mode === "Dark" ? "#fff" : "#222"}
                />
              </button>
              <div className="flex-1 p-2 flex justify-center">
                <div className="w-full">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
                    {data[current].question}
                  </p>
                  <div className="space-y-3">
                    {data[current].choices.map((choiceObj, idx) => (
                      <div key={idx} className="w-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {choiceObj.choice}
                          </span>
                          <span className="text-sm  text-gray-900 dark:text-gray-100">
                            {choiceObj.percentage.toFixed(2)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${choiceObj.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  setCurrent((prev) =>
                    prev < data.length - 1 ? prev + 1 : prev
                  )
                }
                disabled={current === data.length - 1}
                className="p-2 rounded-full  hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-30"
                aria-label="Next statistic"
              >
                <HiOutlineChevronRight
                  size={28}
                  color={mode === "Dark" ? "#fff" : "#222"}
                />
              </button>
            </div>
            <div className="mt-2 text-xs text-center">
              Question {current + 1} of {data.length}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">
            No statistics available for this survey.
          </p>
        )
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic">
          Loading statistics...
        </p>
      )}
    </div>
  );
};

export default SurveyStatistics;
