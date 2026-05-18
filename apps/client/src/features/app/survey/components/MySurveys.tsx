import SurveyCard from "@/features/app/survey/components/SurveyCard.js";
import { useInView } from "react-intersection-observer";
import Placeholder from "@/features/app/survey/components/ui/SurveyCardPlaceholder.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.js";
import { ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "../../../../components/ui/item.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select.js";
import { YouReachedTheEnd } from "../../../../components/YouReachedTheEnd.js";
import { capitalize } from "lodash";
import api from "@/lib/axios.instance.js";
import type { SurveyStatus } from "@inquestia/constants";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

const MySurveys = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus>("published");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-surveys", surveyStatus],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        const res = await api.get(
          `/api/user/me/surveys?page=${pageParam}&limit=${4}&status=${surveyStatus}`
        );
        return res.data;
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const totalSurveys = data?.pages[0]?.totalSurveys ?? 0;
  const surveys = data?.pages?.flatMap((p) => p.surveys);
  const { ref, inView } = useInView();

  const handleChangeSurveyType = (val: SurveyStatus) => {
    setSurveyStatus(val);
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("type", val);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [inView]);

  return (
    <div>
      <Item>
        <ItemContent>
          <ItemTitle className="text-lg font-bold tracking-tighter">
            {totalSurveys} Survey(s)
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <Select
            value={surveyStatus}
            onValueChange={(val) => handleChangeSurveyType(val as SurveyStatus)}
          >
            <SelectTrigger>
              <SelectValue>{capitalize(surveyStatus)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {/** isDraft ? */}
              <SelectGroup>
                <SelectLabel>Filter surveys</SelectLabel>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </ItemActions>
      </Item>

      <div className="space-y-3 flex flex-col gap-1 w-full">
        {surveys && surveys.map((survey) => <SurveyCard survey={survey} />)}
      </div>
      {isFetchingNextPage ? (
        <Placeholder />
      ) : (
        !hasNextPage && <YouReachedTheEnd />
      )}
      <div className="h-2 w-full shrink-0" ref={ref} />
    </div>
  );
};

export default MySurveys;
