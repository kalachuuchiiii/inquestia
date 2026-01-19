import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";

import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";
import Notice from "../../components/html/Notice.jsx";
import QuestionFilter from "../../components/QuestionFilter.jsx";
import { Button } from "../../components/ui/button";
import useFieldArray from "../../hooks/useFieldArray.js";
import { formatIsoString } from "../../utils/formatIsoString.js";

const SurveySummary = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isAuthentic, setIsAuthentic] = useState("all"); 

  const { fieldArray: questions, modifyFieldById, getFieldById, setFieldArray } =
    useFieldArray([]);

  const filterObject = useMemo(
    () => ({
      questions,
      isAuthentic,
    }),
    [isAuthentic, questions]
  );

  const [getSummary, { isLoading }] = useAsync(async ({ filter = null } = {}) => {
    const res = await fetchApi("get", `/survey/summarize/${id}`, {
      filter: JSON.stringify(filter),
    });
    if (!res?.success) return;
    setSurvey(res.survey);
    setSummary(res.response);
    setFieldArray((prev) =>
      prev.length === 0
        ? res.survey.questions.map((q) => ({
            ...q,
            answer: q.type === "text" ? "" : [],
            isStrict: false,
          }))
        : prev
    );
  });

  useEffect(() => {
    getSummary({ filter: filterObject });
  }, [id]);



  const AuthenticityToggle = () => {
    const options = [
      { label: "All", value: "all" },
      { label: "Authentic", value: "true" },
      { label: "Not Authentic", value: "false" },
    ];

    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
            Authenticity Filter
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
            Choose whether to summarize all responses, only authentic ones, or those marked as not authentic.
          </p>
        </div>

        <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setIsAuthentic(opt.value)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                isAuthentic === opt.value
                  ? "bg-blue-600 text-white"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
      {/* Header Section */}
      {survey && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 p-6 border border-blue-100 dark:border-zinc-700 shadow-sm"
        >
          <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-1">
            {survey.title}
          </h1>
          {survey.description && (
            <p className="text-zinc-700 dark:text-zinc-300 mb-1">{survey.description}</p>
          )}
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Target: <span className="font-medium">{survey.targetRespondents || "N/A"}</span> • Conducted{" "}
            {formatIsoString(survey.createdAt)}
          </p>
        </motion.div>
      )}

      {/* Authenticity Filter */}
      <AuthenticityToggle />

      {/* Summary Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-blue-50 dark:border-zinc-800 shadow p-6">
        {isLoading ? (
          <div className="w-full h-96 flex justify-center animate-pulse text-lg items-center">
            <div className="flex gap-2 items-center text-blue-600 dark:text-blue-400">
              <BsStars size="30" /> Generating a summary...
            </div>
          </div>
        ) : summary ? (
          <>
            <div className="flex flex-col justify-center my-3 items-center">
              <div className="w-full text-2xl flex justify-center items-center gap-2">
                <BsStars size="20" />
                <p>AI Summary</p>
              </div>
              <p className="text-sm opacity-50">openai/gpt-oss-120b</p>
            </div>
            <div className="overflow-x-auto prose max-w-none dark:text-neutral-100 text-zinc-900 dark:bg-zinc-900 rounded-lg">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                remarkPlugins={[remarkGfm]}
              >
                {summary}
              </ReactMarkdown>
            </div>
            <div className="mt-6 mb-4 text-center">
              <Notice>
                Note: This summary was generated by AI and may occasionally contain inaccuracies.
              </Notice>
            </div>
          </>
        ) : (
          <div className="h-40 flex justify-center items-center text-zinc-400">
            No summary available for this selection.
          </div>
        )}
      </div>

      {/* Filter Controls */}
      {survey?.questions?.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-blue-50 dark:border-zinc-800 shadow p-6">
          <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4">
            Filter Responses for Summarization
          </h2>

          <QuestionFilter
            questions={survey.questions}
            getFieldById={getFieldById}
            handleChange={modifyFieldById}
          />

          <div className="flex flex-wrap gap-3 mt-4">
            <Button
              className="outline outline-black/20 shadow-md p-2 rounded hover:backdrop-brightness-90 flex-1 sm:flex-none"
              onClick={() => getSummary({ filter: filterObject })}
            >
              Apply Filter & Summarize
            </Button>
            <Button
              variant="secondary"
              className="outline outline-black/20 shadow-md p-2 rounded hover:backdrop-brightness-90 flex-1 sm:flex-none"
              onClick={() => {
                setFieldArray([]);
                getSummary();
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveySummary;
