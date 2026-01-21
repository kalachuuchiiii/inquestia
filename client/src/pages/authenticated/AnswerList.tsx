import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";
import AnswerCard from "../../components/card/AnswerCard.jsx";
import ArrowButton from "../../components/html/ArrowButton.jsx";
import SurveyStatistics from "../../components/SurveyStatistics.jsx";
import QuestionFilter from "../../components/QuestionFilter.jsx";
import useFieldArray from "../../hooks/useFieldArray.js";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, RefreshCcw } from "lucide-react";
import MultipleChoiceDataSet from "../../components/MultipleChoiceDataSet.jsx";
import { useApi } from "@/hooks/useApi.js";
import { useInfiniteQuery } from "@tanstack/react-query";

const AnswerListPage = () => {
  const [survey, setSurvey] = useState({});
  const [totalAnswers, setTotalAnswers] = useState(0);
  const {
    fieldArray: questions,
    modifyFieldById,
    getFieldById,
    setFieldArray,
  } = useFieldArray([]);
  const [statistics, setStatistics] = useState([]);
  const { ref, inView } = useInView();
  const { id } = useParams();
  const [isAuthentic, setIsAuthentic] = useState("all");
  const filterObject = useMemo(
    () => ({ questions, isAuthentic }),
    [isAuthentic, questions]
  );

  // 🔹 Fetch Answers
  const api = useApi();

  const {
    fetchNextPage: getAnswers,
    isPending: isLoading,
    data,
    hasNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["answer-list", id],
    queryFn: async ({ pageParam }) => {
      const res = await api.get(
        `/api/survey/answers/${id}?page=${pageParam}&limit=${5}`,
        {
          params: {
            filter: filterObject,
          },
        }
      );
      setTotalAnswers(res.data.totalAnswers);
      return res;
    },
    getNextPageParam: (res) => res.data.nextPage ?? null,
  });
  const answers = data?.pages.flatMap((p) => p.data.answers);

  // 🔹 Fetch Statistics
  const [getStatistics, { isLoading: isLoadingSurvey }] = useAsync(
    async (initial = true) => {
      const res = await fetchApi("get", `/survey/${id}/statistics`, {
        isAuthentic,
      });
      if (!res.success) return;

      setSurvey(res.survey);
      if (initial) {
        setFieldArray(
          res.survey.questions.map((q) => ({
            ...q,
            answer: q.type === "text" ? "" : [],
            isStrict: false,
          }))
        );
      }
      setStatistics(res.statistics);
    }
  );

  // 🔹 Initial load
  useEffect(() => {
    getStatistics();
  }, [id]);

  useEffect(() => {
    if (isLoading || !inView || !hasNextPage) return;
    getAnswers();
  }, [inView]);

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white dark:bg-zinc-900 rounded-xl shadow p-4 border border-blue-50 dark:border-zinc-800 space-y-4">
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3"></div>
      <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3"></div>
      <div className="h-20 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
    </div>
  );

  // 🔹 Authenticity Selector UI
  const AuthenticitySelector = () => {
    const options = [
      { label: "All", value: "ALL" },
      { label: "Authentic", value: "AUTHENTIC" },
      { label: "Not Authentic", value: "NOT_AUTHENTIC" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mb-6 rounded-xl bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 border border-blue-100 dark:border-zinc-700 p-5 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              Authentic Answers Filter
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              Choose which type of answers to display and include in summaries.{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                Authentic answers
              </span>{" "}
              are those marked as “makes sense,” while{" "}
              <span className="font-medium text-red-500 dark:text-red-400">
                Not authentic
              </span>{" "}
              are marked as irrelevant or nonsense.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setIsAuthentic(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border shadow-sm ${
                  isAuthentic === opt.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full mx-auto py-8 px-2 md:px-6">
      {/* Authenticity Filter */}
      <AuthenticitySelector />

      {/* Survey Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 mb-6 border border-blue-50 dark:border-zinc-800 flex flex-col gap-2">
        {isLoadingSurvey ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-zinc-200 dark:bg-zinc-700 w-1/2 rounded"></div>
            <div className="h-20 bg-zinc-200 dark:bg-zinc-700 w-2/3 rounded"></div>
            <div className="h-100 bg-zinc-200 dark:bg-zinc-700 w-full rounded"></div>
            <div className="h-10 bg-zinc-200 dark:bg-zinc-700 w-full rounded"></div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl text-gradient font-semibold">
              {survey.title}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-2">
              {survey.description}
            </p>

            {statistics?.length > 0 && (
              <>
                <SurveyStatistics data={statistics} />{" "}
              </>
            )}

            <div className="flex items-center justify-between w-full gap-2">
              <button
                className="flex items-center gap-2"
                onClick={() => getStatistics(false)}
              >
                <RefreshCcw />
                Refresh statistics
              </button>
              <Link to={`/survey-summary/${survey._id}`}>
                <Button variant={"outline"}>
                  <span className="inline-block">✨ Generate AI Summary</span>
                  <ChevronRight />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Filters */}
      {survey?.questions?.length > 0 && (
        <div className="md:col-span-5">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5 mb-6 border border-blue-50 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                Filters
              </h2>
            </div>

            <QuestionFilter
              getFieldById={getFieldById}
              handleChange={modifyFieldById}
              questions={survey.questions}
            />

            <div className="flex md:flex-col gap-3 mt-4">
              <Button
                className={`outline ${
                  isFilterOn ? " bg-blue-600 " : ""
                } truncate outline-blue-400 shadow-md p-2 rounded hover:backdrop-brightness-90 flex-1 sm:flex-none `}
                onClick={() => getAnswers({ turnOnFilter: true })}
              >
                Apply Filter
              </Button>
              <Button
                className="outline p-2 truncate outline-blue-400 shadow-md rounded hover:backdrop-brightness-90 flex-1 sm:flex-none"
                onClick={() => getAnswers({ turnOnFilter: false })}
                variant="secondary"
              >
                Remove Filter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Answers Section */}
      <div>
        <div
          className={
            survey?.questions?.length > 0 ? "md:col-span-7" : "col-span-12"
          }
        >
          {isLoading && answers.length === 0 ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : totalAnswers > 0 ? (
            <>
              <div className="flex justify-between w-full items-center mb-4">
                <span className="text-sm text-zinc-500">
                  Total Answers:{" "}
                  <span className="font-semibold text-blue-600">
                    {totalAnswers}
                  </span>
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-2">
                These are the answers for this survey:
              </p>
              <div className="space-y-4">
                {answers?.length > 0 &&
                  answers.map((answer) => (
                    <AnswerCard
                      showModifyAuthenticityButton
                      answer={answer}
                      key={answer._id}
                    />
                  ))}
              </div>
              {isLoading && (
                <div className="flex justify-center mt-6">
                  <motion.div
                    className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            !isLoading && (
              <div className="h-96 flex justify-center items-center text-zinc-400">
                There are no responses yet for this survey.
              </div>
            )
          )}
          <div ref={ref} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default AnswerListPage;
