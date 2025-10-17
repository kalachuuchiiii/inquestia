import React, { useState, useRef } from "react";

import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; // ✅ NEW
import SliderButton from "./SliderButton";

// ✅ Register plugin once
Chart.register(ChartDataLabels);

const chartTypes = [
  { label: "Bar", value: "bar" },
  { label: "Pie", value: "pie" },
  { label: "Doughnut", value: "doughnut" },
];

const SurveyStatistics = ({ data = null }) => {
  const [current, setCurrent] = useState(0);
  const [chartType, setChartType] = useState("bar");
  const chartRef = useRef(null);

  const handleNext = () =>
    setCurrent((prev) => (prev === data.length - 1 ? prev : prev + 1));
  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? prev : prev - 1));

  const getChartData = (questionData) => ({
    labels: questionData.choices.map((c) => c.choice),
    datasets: [
      {
        label: "Responses (%)",
        data: questionData.choices.map((c) => c.percentage),
        counts: questionData.choices.map((c) => c.count), // ✅ Added counts
        backgroundColor: [
          "#2563eb",
          "#38bdf8",
          "#818cf8",
          "#f472b6",
          "#fbbf24",
          "#34d399",
          "#f87171",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  });

  const handleDownload = () => {
    if (!chartRef.current) return;
    const chartInstance = chartRef.current;
    const url = chartInstance.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = `survey-question-${current + 1}-${chartType}.png`;
    link.click();
  };

  // ✅ Chart options updated with data labels
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis:  "x",
    plugins: {
      legend: {
        labels: { color: "#000" },
      },
      datalabels: {
        color: "#000",
        anchor: chartType === "bar" ? "end" : "center",
        align: chartType === "bar" ? "top" : "center",
        font: { weight: "bold", size: 12 },
        formatter: (value, context) => {
          const count =
            context.chart.data.datasets[0].counts[context.dataIndex];
          return `${value.toFixed(1)}% (${count})`;
        },
      },
    },
    scales:
      chartType === "bar" || chartType === "bar-horizontal"
        ? {
            x: {
              ticks: { color: "#000" },
              grid: { color: "#ddd" },
            },
            y: {
              ticks: { color: "#000" },
              grid: { color: "#ddd" },
            },
          }
        : {},
  };

  const renderChart = () => {
    const chartProps = {
      ref: chartRef,
      data: getChartData(data[current]),
      options: chartOptions,
      plugins: [ChartDataLabels], // ✅ attach the plugin
    };

    switch (chartType) {
      case "bar":
        return <Bar {...chartProps} />;
      case "pie":
        return <Pie {...chartProps} />;
      case "doughnut":
        return <Doughnut {...chartProps} />;
      default:
        return <Bar {...chartProps} />;
    }
  };

  return (
    <div className="shadow-lg col-span-5 col-start-8 rounded-2xl p-6 w-full mx-auto my-6">
      {data ? (
        data.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            {/* Question */}
            <p className="font-semibold mb-4 text-center text-base sm:text-lg">
              {data[current].question}
            </p>

            {/* Chart Type Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {chartTypes.map((type) => (
                <button
                  key={type.value}
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition
                    ${
                      chartType === type.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  onClick={() => setChartType(type.value)}
                >
                  {type.label}
                </button>
              ))}
              <button
                className="ml-2 px-3 py-1 rounded-full bg-green-500 text-white flex items-center gap-1 hover:bg-green-600 transition"
                onClick={handleDownload}
                title="Download chart"
              >
                <FiDownload size={16} />
                Download
              </button>
            </div>

            {/* Chart Container */}
            <div className="w-full md:w-8/12 bg-white rounded-xl p-4 shadow-inner border border-gray-200">
              <div className="relative h-64 sm:h-80 md:h-96">
                {renderChart()}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex w-full flex-col items-center justify-center mt-6">
              <SliderButton
                last={current === data.length - 1}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm text-center">
                Question {current + 1} of {data.length}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No statistics available.</p>
        )
      ) : (
        <p className="text-gray-500 italic">Loading statistics...</p>
      )}
    </div>
  );
};

export default SurveyStatistics;
