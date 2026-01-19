import React, { useState, useRef } from "react";
import SliderButton from "./SliderButton";
import { FiDownload } from "react-icons/fi";
import { toPng } from "html-to-image";

const MultipleChoiceDataSet = ({ data = [] }) => {
  const [current, setCurrent] = useState(0);
  const chartRef = useRef(null);
  const excludeRef = useRef(null); // ref for the button section

  const handleNext = () =>
    setCurrent((prev) => (prev === data?.length - 1 ? prev : prev + 1));
  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? prev : prev - 1));

  const question = data?.[current];

  const handleDownload = async () => {
    if (!chartRef.current) return;

    // temporarily hide the buttons before capture
    const excludeNode = excludeRef.current;
    if (excludeNode) excludeNode.style.display = "none";
const title = document.getElementById('question-title');
title.style.color = "#000";

    try {
      const dataUrl = await toPng(chartRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        quality: 1,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `chart-question-${question?.question}.png`;
      link.click();
      
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      if (excludeNode) excludeNode.style.display = "";
      title.style.color = "#fff";
    }
  };

  return (
    <div
      ref={chartRef}
      className="my-8 mx-auto w-full p-6 rounded-2xl shadow-md transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 id = 'question-title' className="text-lg dark:text-white sm:text-xl font-semibold text-gray-900 text-center w-full">
          {question?.question || "No question available"}
        </h2>
      </div>

      {/* Buttons (temporarily hidden during download) */}
      <div
        ref={excludeRef}
        className="w-full mb-4 flex items-center justify-center gap-2 text-center"
      >
        <button className="px-3 py-1 shadow-2xl shadow-blue-50 rounded-full bg-blue-600 font-semibold text-sm text-white">
          Horizontal Bar
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-medium transition"
          title="Download chart"
        >
          <FiDownload size={16} /> Download
        </button>
      </div>

      {/* Capture area */}
      <div className="space-y-4 md:w-8/12 bg-white p-2 rounded-xl md:mx-auto">
        {question?.choices?.map((choiceObj, idx) => (
          <div key={idx} className="p-3 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900 truncate">
                {choiceObj?.choice}
              </span>
              <span className="text-sm text-gray-700">
                {choiceObj?.percentage?.toFixed(2)}%{" "}
                <span className="text-xs text-gray-500">
                  ({choiceObj?.count})
                </span>
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${choiceObj?.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex flex-col items-center space-y-2">
        <SliderButton
          last={current === data.length - 1}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
        <p className="text-xs text-gray-600">
          Question {current + 1} of {data.length}
        </p>
      </div>
    </div>
  );
};

export default MultipleChoiceDataSet;

