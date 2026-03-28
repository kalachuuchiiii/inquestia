import React, { useState, useRef, type FC } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChevronLeft, ChevronRight, DownloadCloud } from "lucide-react";
import html2canvas from "html2canvas";

/** Choice statistics */
interface ChoiceStats {
  choice: string;
  count: number;
  percentage: number;
}

/** Question statistics with choices */
interface QuestionStats {
  questionId: string;
  question: string;
  type: string;
  choices: ChoiceStats[];
  createdAt?: string;
}

/** Props for StatisticsChart component */
interface StatisticsChartProps {
  data: QuestionStats[] | null;
  isLoading?: boolean;
}

/** Color palette for charts */
const COLORS = [
  "#2563eb",
  "#38bdf8",
  "#818cf8",
  "#f472b6",
  "#fbbf24",
  "#34d399",
  "#f87171",
  "#a78bfa",
  "#fb923c",
  "#10b981",
];

// Register Chart.js plugins
Chart.register(ChartDataLabels);

/**
 * StatisticsChart Component
 * 
 * Displays survey question statistics with interactive chart visualization using Chart.js.
 * Features:
 * - Multiple chart types (Bar, Pie, Doughnut)
 * - Navigation between questions
 * - Download chart as PNG image
 * - Responsive design
 * 
 * @component
 * @param {StatisticsChartProps} props - Component props
 * @returns {JSX.Element} Rendered statistics chart
 */
const StatisticsChart: FC<StatisticsChartProps> = ({ data = null, isLoading = false }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [chartType, setChartType] = useState<"bar" | "pie" | "doughnut">("bar");
  const chartRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!data || data.length === 0 || isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-80 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-3"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading statistics...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = data[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? prev : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const downloadChart = async () => {
    if (!containerRef.current) return;
    try {
      const canvas = await html2canvas(containerRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = `statistics-${currentQuestion.question.substring(0, 30)}.png`;
      link.click();
    } catch (error) {
    }
  };

  // Prepare data for Chart.js
  const chartData = {
    labels: currentQuestion.choices.map((c) => c.choice),
    datasets: [
      {
        label: "Response %",
        data: currentQuestion.choices.map((c) => c.percentage),
        backgroundColor: COLORS.slice(0, currentQuestion.choices.length),
        borderColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value: number) => `${value.toFixed(1)}%`,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        cornerRadius: 8,
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed.y.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-blue-100 dark:border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-zinc-800 dark:to-zinc-900 p-6 border-b border-blue-100 dark:border-zinc-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
              Q{currentIndex + 1}: {currentQuestion.question}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {currentQuestion.choices.reduce((sum, c) => sum + c.count, 0)} total responses
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Chart Type Toggle */}
            <div className="flex gap-2 bg-white dark:bg-zinc-800 rounded-lg p-1 border border-zinc-200 dark:border-zinc-700">
              {["bar", "pie", "doughnut"].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type as "bar" | "pie" | "doughnut")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    chartType === type
                      ? "bg-blue-600 text-white"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                >
                  {type === "bar" ? "📊" : type === "pie" ? "🥧" : "🍩"}
                </button>
              ))}
            </div>

            {/* Download Button */}
            <button
              onClick={downloadChart}
              className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <DownloadCloud className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div
        ref={containerRef}
        className="w-full bg-white dark:bg-zinc-900 p-6 flex justify-center items-center min-h-96"
      >
        <div className="w-full h-96 relative">
          {chartType === "bar" ? (
            <Bar ref={chartRef} data={chartData} options={chartOptions as any} />
          ) : chartType === "pie" ? (
            <Pie ref={chartRef} data={chartData} options={chartOptions as any} />
          ) : (
            <Doughnut ref={chartRef} data={chartData} options={chartOptions as any} />
          )}
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="p-6 border-t border-blue-100 dark:border-zinc-800">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">
          Detailed Breakdown
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                  Choice
                </th>
                <th className="text-right py-3 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                  Count
                </th>
                <th className="text-right py-3 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {currentQuestion.choices.map((choice, idx) => (
                <tr
                  key={idx}
                  className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="py-3 px-4 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    ></div>
                    {choice.choice}
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-600 dark:text-zinc-400 font-medium">
                    {choice.count}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${choice.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold min-w-fit">
                        {choice.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      {data.length > 1 && (
        <div className="px-6 py-4 border-t border-blue-100 dark:border-zinc-800 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-zinc-800/50 dark:to-zinc-900/50">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {data.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-blue-600 w-8"
                      : "bg-zinc-300 dark:bg-zinc-600 w-2 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                  }`}
                  title={`Go to question ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === data.length - 1}
              className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Question Counter */}
          <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-3">
            Question {currentIndex + 1} of {data.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsChart;
