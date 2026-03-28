import SurveyCard from "@/features/app/survey/components/SurveyCard.js";
import { useInView } from "react-intersection-observer";
import Placeholder from "@/features/app/survey/components/ui/SurveyCardPlaceholder.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.js";
import { ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import type { GetOwnedSurveysResponse } from "@inquestia/types";
import { Item, ItemActions, ItemContent, ItemTitle } from "../../../../components/ui/item.js";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../../components/ui/select.js";
import { YouReachedTheEnd } from "../../../../components/YouReachedTheEnd.js";
import { capitalize } from "lodash";
import api from "@/lib/axios.instance.js";

type SurveyType = 'drafts' | 'published';

const MySurveys = () => {

  

  const [searchParams, setSearchParams] = useSearchParams();
  const [surveyType, setSurveyType] = useState<SurveyType>(String(searchParams.get('type')) === 'drafts' ? 'drafts' : 'published');
 
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-surveys", surveyType],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        const res = await api.get<GetOwnedSurveysResponse>(
          `/api/user/me/surveys?page=${pageParam}&limit=${4}&isDraft=${surveyType === 'drafts'}`
        );
        return res.data;
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const totalSurveys = data?.pages[0]?.totalSurveys ?? 0;
  const surveys = data?.pages?.flatMap((p) => p.surveys);
  const { ref, inView } = useInView();

  const handleChangeSurveyType = (val: SurveyType) => {
    setSurveyType(val);
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('type', val);
    setSearchParams(newSearchParams)
  }

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
          <Select value = {surveyType} onValueChange={(val) =>  handleChangeSurveyType(val as SurveyType)}>
            <SelectTrigger>
              <SelectValue>
                {capitalize(surveyType)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {/** isDraft ? */}
              <SelectGroup>
                <SelectLabel>Filter surveys</SelectLabel>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="drafts">Drafts</SelectItem>
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
