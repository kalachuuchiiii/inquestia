import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SurveyCard from "../card/SurveyCard.jsx";
import SurveyPlaceholder from "../card/placeholders/surveyCardPlaceholder.jsx";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "@/lib/axios.instance.js";
import { type ISurvey, type SurveyListResponse } from "@shared/index.js";
import type { RootState } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import { toast } from "sonner";

const QuerySurvey = () => {
  const [searchQuery] = useSearchParams();
  const [nextPage, setNextPage] = useState(1);
  const { ref, inView } = useInView();
  const {
    user = {
      interests: [],
    },
    isAuthenticated = false,
  } = useAppSelector((state) => state.user);
  const [totalSurveys, setTotalSurveys] = useState(1);
  const [isNoResultsFound, setIsNoResultsFound] = useState(false);

  const {
    data,
    fetchNextPage: getSurveys,
    isPending: isLoading,
    hasNextPage,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      const res = await API.get<SurveyListResponse>(
        `/api/survey/list?page=${pageParam}&limit=${4}`,
        {
          params: {
            filter: {
              tags: [searchQuery.get("q")],
              description: searchQuery.get("q"),
            },
          },
        }
      );
      setTotalSurveys(res.data.totalSurveys);
      return res;
    },
    queryKey: ["surveys"],
    initialPageParam: 1,
    getNextPageParam: (res) => res.data.nextPage ?? null,
  });

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    getSurveys();
  }, [inView]);

  const surveys = data?.pages.flatMap((f) => f.data.survey) ?? [];

  return (
    <div className="space-y-1">
      {!isLoading && totalSurveys === 0 ? (
        <div className="flex justify-center opacity-70 items-center h-96 ">
          No results found
        </div>
      ) : surveys?.length > 0 ? (
        surveys.map((s) => <SurveyCard key={s._id} survey={s} />)
      ) : (
        totalSurveys === 0 && (
          <p className="w-full h-40 flex text-xl opacity-80 justify-center items-center">
            Start searching!
          </p>
        )
      )}{" "}
      {isLoading && <SurveyPlaceholder number={1} />}
      <div ref={ref} />
    </div>
  );
};

export default QuerySurvey;
