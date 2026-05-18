import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LoadingDisplay from "@/components/ui/LoadingDisplay.jsx";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.js";
import { ChevronRight } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/axios.instance";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import { AnswerCard } from "@/features/app/answers/components/MyAnswerCard.js";
import type { Answer, AnswerForm } from "@inquestia/schemas";
import { useAccount } from "../../account/hooks/useAccount";

const MyResponsesPage = () => {
  const { data: user } = useAccount();
  const {
    fetchNextPage: getMyAnswers,
    data,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<{
        nextPage: number | undefined;
        answers: Answer[];
      }>(`/api/answers/me?page=${pageParam}`);
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (res) => res.nextPage,
    queryKey: ["my-answers"],
    enabled: !!user,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) return;
    getMyAnswers();
  }, [inView]);

  const answers = data?.pages.flatMap((p) => p.answers) ?? [];

  return (
    <div className=" w-full  mx-auto">
      {answers?.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col items-start ">
            <h1 className="inter font-bold text-3xl tracking-tighter">
              Your Response Records
            </h1>
            <p>
              A history of all the surveys you’ve contributed to. Keep track of
              your answers and revisit surveys anytime!
            </p>
          </div>

          {/* Answer list */}
          <div className="space-y-4">
            {answers.map((ans) => (
              <AnswerCard key={ans._id} answer={ans} />
            ))}
          </div>

          {/* Infinite scroll trigger */}
          <div ref={ref} className="h-12" />
        </div>
      )}

      {/* Loading state */}
      {isFetchingNextPage && (
        <div className="mt-8">
          <LoadingDisplay>Loading more responses...</LoadingDisplay>
        </div>
      )}

      {/* Empty state */}
      {!isFetchingNextPage && answers?.length === 0 && (
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

export default MyResponsesPage;
