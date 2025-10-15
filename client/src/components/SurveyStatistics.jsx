import React, { useState, useRef } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const chartTypes = [
  { label: "Bar", value: "bar" },
  { label: "Pie", value: "pie" },
  { label: "Doughnut", value: "doughnut" },
];

const SurveyStatistics = ({ data = null }) => {
  const [current, setCurrent] = useState(0);
  const [chartType, setChartType] = useState("bar");
  const { mode } = useSelector((state) => state.theme);
  const chartRef = useRef(null);

  const getChartData = (questionData) => ({
    labels: questionData.choices.map((c) => c.choice),
    datasets: [
      {
        label: "Responses (%)",
        data: questionData.choices.map((c) => c.percentage),
        backgroundColor: [
          "#2563eb", "#38bdf8", "#818cf8", "#f472b6", "#fbbf24", "#34d399", "#f87171"
        ],
        borderColor: "#fff",
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

  return (
    <div className={`shadow-lg col-span-5 col-start-8 rounded-2xl p-6 w-full  mx-auto my-6
      ${mode === "Dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
     
      {data ? (
        data.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center w-full justify-between mb-4">
              <button
                onClick={() => setCurrent((prev) => (prev > 0 ? prev - 1 : prev))}
                disabled={current === 0}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-30"
                aria-label="Previous statistic"
              >
                <HiOutlineChevronLeft size={28} />
              </button>
              <div className="flex-1 flex flex-col items-center">
                <p className="font-semibold mb-2 text-center">
                  {data[current].question}
                </p>
                <div className="flex gap-2 mb-2">
                  {chartTypes.map((type) => (
                    <button
                      key={type.value}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition
                        ${chartType === type.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
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
                <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  {chartType === "bar" && (
                    <Bar
                      ref={chartRef}
                      data={getChartData(data[current])}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                        },
                        scales: {
                          x: {
                            ticks: { color: mode === "Dark" ? "#fff" : "#222" },
                            grid: { color: mode === "Dark" ? "#444" : "#eee" },
                          },
                          y: {
                            ticks: { color: mode === "Dark" ? "#fff" : "#222" },
                            grid: { color: mode === "Dark" ? "#444" : "#eee" },
                          },
                        },
                      }}
                    />
                  )}
                  {chartType === "pie" && (
                    <Pie
                      ref={chartRef}
                      data={getChartData(data[current])}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            labels: {
                              color: mode === "Dark" ? "#fff" : "#222",
                            },
                          },
                        },
                      }}
                    />
                  )}
                  {chartType === "doughnut" && (
                    <Doughnut
                      ref={chartRef}
                      data={getChartData(data[current])}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            labels: {
                              color: mode === "Dark" ? "#fff" : "#222",
                            },
                          },
                        },
                      }}
                    />
                  )}
                </div>
              </div>
              <button
                onClick={() =>
                  setCurrent((prev) =>
                    prev < data.length - 1 ? prev + 1 : prev
                  )
                }
                disabled={current === data.length - 1}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-30"
                aria-label="Next statistic"
              >
                <HiOutlineChevronRight size={28} />
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