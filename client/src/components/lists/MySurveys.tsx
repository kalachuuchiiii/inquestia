import SurveyCard from "../card/SurveyCard.js";
import { useInView } from "react-intersection-observer";
import Placeholder from "../card/placeholders/surveyCardPlaceholder.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ArrowButton from "../html/ArrowButton.js";
import { Button } from "../ui/button.js";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useApi } from "@/hooks/useApi.js";
import type { GetOwnedSurveysResponse } from "@shared/index.js";
import { Item, ItemActions, ItemContent, ItemTitle } from "../ui/item.js";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select.js";
import { YouReachedTheEnd } from "../YouReachedTheEnd.js";


const MySurveys = () => {
  const api = useApi();
  const [isDraft, setIsDraft] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-surveys", isDraft],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        const res = await api.get<GetOwnedSurveysResponse>(
          `/api/user/me/surveys?page=${pageParam}&limit=${4}&isDraft=${isDraft}`
        );
        return res.data;
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const totalSurveys = data?.pages[0]?.totalSurveys ?? 0;
  const surveys = data?.pages?.flatMap((p) => p.surveys);
  const { ref, inView } = useInView();

  const handleChangeSurveyStatus = (val: string) => {
    setIsDraft(val === "true");
  };

  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [inView]);

  return (
    <div>
      <Item>
        <ItemContent>
          <ItemTitle>{totalSurveys} Survey(s)</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Select value = {isDraft ? 'true' : 'false'} onValueChange={(val) => handleChangeSurveyStatus(val)}>
            <SelectTrigger>
              <SelectValue>
                {isDraft ? 'Drafts' : 'Published'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {/** isDraft ? */}
              <SelectGroup>
                <SelectLabel>Filter surveys</SelectLabel>
                <SelectItem value="false">Published</SelectItem>
                <SelectItem value="true">Drafts</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </ItemActions>
      </Item>

      <div className="space-y-3">
        {surveys ? (
          surveys.map((survey) => <SurveyCard survey={survey} />)
        ) : totalSurveys === 0 ? (
          <div className="h-60 w-full flex flex-col justify-center gap-3 items-center text-center">
            <p className="text-xs opacity-70">
              You don’t have any surveys yet. Start by creating one to begin
              collecting responses.
            </p>
            <Link to="/create">
              <Button variant={"outline"}>
                <p>Create Survey</p>
                <ChevronRight />
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
      {isFetchingNextPage ? (
        <Placeholder />
      ) : (
        !hasNextPage && (
          <YouReachedTheEnd />
        )
      )}
      <div className="h-2 w-full shrink-0" ref={ref} />
    </div>
  );
};

export default MySurveys;
