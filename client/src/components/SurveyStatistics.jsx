import React from "react";

const SurveyStatistics = ({ data }) => {
  return (
    <div className="shadow-lg rounded-2xl p-6 bg-neutral-50  dark:bg-gray-800 my-6">
      {/* 🔹 Header */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          📊 Survey Statistics
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of responses for each question with selectable options.
        </p>
      </div>

      {/* 🔹 Stats */}
      {data?.length > 0 ? (
        data.map((stat, index) => (
          <div key={index} className="mb-8">
            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {stat.question}
            </p>
            <div className="space-y-3">
              {stat.choices.map((choiceObj, idx) => (
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
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic">
          No statistics available for this survey.
        </p>
      )}
    </div>
  );
};

export default SurveyStatistics;
