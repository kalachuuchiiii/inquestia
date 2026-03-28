import React, { useState, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import SliderButton from "../../../../components/SliderButton";
import { Card } from "../../../../components/ui/card";

/** Question choice option with statistics */
interface Choice {
  choice: string;
  percentage: number;
  count: number;
}

/** Survey question data with select-type choices - matches assistant controller return type */
interface SelectTypeQuestion {
  questionId: string;
  question: string;
  type: "select";
  choices: Choice[];
  createdAt: Date;
}

/** Chart type options for display */
type ChartType = "bar" | "pie" | "doughnut";

/** Props for the SurveyStatistics component */
interface SurveyStatisticsProps {
  data: SelectTypeQuestion[] | null;
}

/** Chart type configuration */
const chartTypes = [
  { label: "Bar", value: "bar" as const },
  { label: "Pie", value: "pie" as const },
  { label: "Doughnut", value: "doughnut" as const },
];

// ✅ Register Chart.js plugins
Chart.register(ChartDataLabels);

const SurveyStatistics = ({ data }: SurveyStatisticsProps) => {
  const [current, setCurrent] = useState<number>(0);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const chartRef = useRef<any>(null);


  /**
   * Navigate to the next question
   * Prevents going beyond the last question
   */
  const handleNext = (): void => {
    if (!data) return;
    setCurrent((prev) => (prev === data.length - 1 ? prev : prev + 1));
  };

  /**
   * Navigate to the previous question
   * Prevents going below the first question
   */
  const handlePrev = (): void => {
    setCurrent((prev) => (prev === 0 ? prev : prev - 1));
  };

  /**
   * Generate chart data from question statistics
   * Maps question choices to chart dataset format
   * 
   * @param {SelectTypeQuestion} questionData - The question data to visualize
   * @returns Chart.js compatible data object
   */
  const truncateLabel = (text: string, maxLength: number = 50): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getChartData = (questionData: SelectTypeQuestion) => ({
    labels: questionData.choices.map((c: Choice) => truncateLabel(c.choice)),
    fullLabels: questionData.choices.map((c: Choice) => c.choice),
    datasets: [
      {
        label: "Responses (%)",
        data: questionData.choices.map((c: Choice) => c.percentage),
        counts: questionData.choices.map((c: Choice) => c.count),
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

  /**
   * Download the current chart as a PNG image
   * Uses the chart reference to generate a base64 image
   */
  const handleDownload = (): void => {
    if (!chartRef.current) return;
    const url = chartRef.current?.canvas?.toDataURL() || "";
    const link = document.createElement("a");
    link.href = url;
    link.download = `survey-question-${current + 1}-${chartType}.png`;
    link.click();
  };

  /**
   * Chart configuration options
   * Includes styling, data labels, and responsive behavior
   */
  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x" as const,
    plugins: {
      legend: {
        labels: { color: "#000" },
      },
      datalabels: {
        color: "#000",
        anchor: chartType === "bar" ? ("end" as const) : ("center" as const),
        align: chartType === "bar" ? ("top" as const) : ("center" as const),
        font: { weight: "bold" as const, size: 12 },
        formatter: (value: number, context: any): string => {
          const count = context.chart.data.datasets[0].counts[context.dataIndex];
          return `${value.toFixed(1)}% (${count})`;
        },
      },
    },
    scales:
      chartType === "bar"
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
        : undefined,
  };

   const renderChart = (): any => {
    if (!data || data.length === 0) {
      return <div className="text-center">No data available</div>;
    }

    // Safely access current question
    const currentQuestion = data[current];
    if (!currentQuestion) {
      return <div className="text-center">No question found</div>;
    }

    const chartProps = {
      ref: chartRef,
      data: getChartData(currentQuestion),
      options: chartOptions,
      plugins: [ChartDataLabels],
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
    <Card >
      {data ? (
        data.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            {/* Question */}
            <p className="font-semibold mb-4 text-center text-base sm:text-lg">
              {data[current]?.question || "Question"}
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
    </Card>
  );
};

export default SurveyStatistics;

