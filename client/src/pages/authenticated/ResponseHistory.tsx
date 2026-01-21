import { useEffect, useState } from "react";
import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";
import AnswerCard from "../../components/card/AnswerCard.jsx";
import { useInView } from "react-intersection-observer";
import LoadingDisplay from "../../components/html/LoadingDisplay.jsx";
import ArrowButton from "../../components/html/ArrowButton.jsx";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.js";
import { ChevronRight } from "lucide-react";

const ResponseHistory = () => {
  const [answerList, setAnswerList] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  const [getAnswerList, { isLoading }] = useAsync(
    async ({ page = 1, overwrite = true } = {}) => {
      const res = await fetchApi("get", "/answer/list", { page });
      if (!res?.success) return;
      setNextPage(res.nextPage);
      setAnswerList((prev) =>
        overwrite ? res.answers : [...prev, ...res.answers]
      );
    }
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    getAnswerList();
  }, []);

  useEffect(() => {
    if (!inView || nextPage === null || isLoading) return;
    getAnswerList({ page: nextPage, overwrite: false });
  }, [inView, nextPage]);

  return (
    <div className="p-6 w-full  mx-auto">
      {answerList?.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col items-start text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Your Response Records
            </h1>
            <p className=" text-zinc-600 dark:text-zinc-400 mt-1">
              A history of all the surveys you’ve contributed to. Keep track of
              your answers and revisit surveys anytime!
            </p>
          </div>

          {/* Answer list */}
          <div className="space-y-4">
            {answerList.map((ans) => (
              <AnswerCard
                key={ans._id}
                answer={ans}
                showRedirectToSurvey
                className="rounded-xl shadow-md hover:shadow-xl transition bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-400"
              />
            ))}
          </div>

          {/* Infinite scroll trigger */}
          <div ref={ref} className="h-12" />
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="mt-8">
          <LoadingDisplay>Loading more responses...</LoadingDisplay>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && answerList?.length === 0 && (
        <div className="w-full h-72 flex flex-col gap-5 items-center justify-center text-center">
          <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
            You haven’t answered any surveys yet.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            Start your journey by sharing your thoughts in surveys. Your
            opinions shape better results for everyone ✨
          </p>
          <Link to="/home">
            <Button variant={"outline"}>
              <p> Start Answering</p>
              <ChevronRight />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResponseHistory;
