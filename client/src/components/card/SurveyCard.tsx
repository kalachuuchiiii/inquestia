import { memo, type JSX } from "react";
import type { SurveyDTO } from "@shared/types";
import SurveyTagList from "../lists/SurveyTagList";
import Bar from "../html/Bar";
import { formatDistanceToNow } from "date-fns";
import { UserBadge } from "../UserBadge";
import ArrowButton from "../html/ArrowButton";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const SurveyCard = memo(({ survey }: { survey: SurveyDTO }) => {
  const {
    _id,
    title,
    description,
    questions = [],
    createdAt,
    tags = [],
    targetRespondents = 8,
    totalRespondents = 0,
    closed,
    hasReachedTargetRespondents,
    isDraft,
    author,
  } = survey;

  const redirectTo = isDraft
    ? `/survey/drafts/${_id}`
    : `/survey/published/${_id}`;
  const redirectDisplay = isDraft ? "View Draft" : "View Survey";

  return (
    <div className="grid grid-cols-1 grid-rows-1 place-content-center relative rounded-2xl dark:bg-zinc-900 bg-neutral-50 p-1 shadow-xl overflow-hidden">
      <div className="flex row-start-1 col-start-1 flex-col gap-2 p-4 relative">
        <div className="text-sm overflow-y-auto scrollbar-none w-full bg-neutral-100 p-4 dark:bg-[#101012] rounded-lg">
          <h1 className="text-xl leading-5 lato truncate">{title}</h1>
          <p className="text-sm opacity-80 px-2 text-justify line-clamp-2">
            {description}
          </p>
          <div className="p-2 my-2 text-xs opacity-80">
            {questions.slice(0, 3).map((q: any, i: number) => (
              <p key={i}>
                Question {i + 1}: {q?.question}
              </p>
            ))}
            {questions.length > 3 && <p>... and {questions.length - 3} more</p>}
          </div>
        </div>
        <div className="text-xs p-2 border-t border-gray-200 dark:border-gray-800">
          <UserBadge displayBadge user={author} />
          <div className="opacity-80 flex items-center text-sm gap-2 py-1">
            <p>{formatDistanceToNow(createdAt.toString())}</p>
            <p>•</p>
            <p>{`${questions.length} ${
              questions.length === 1 ? "question" : "questions"
            }`}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm w-full opacity-80">
            <SurveyTagList tags={tags as any} />
          </div>
        </div>
        <div className="border-t border-gray-200 flex gap-2 items-center dark:border-gray-800 p-2 bg-gradient-to-t from-zinc-50 dark:from-zinc-950">
          <Bar total={totalRespondents} target={targetRespondents} />
          <Link to={redirectTo}>
            <Button variant={"outline"}>
              <p>{redirectDisplay}</p>
              <ChevronRight />
            </Button>
          </Link>
        </div>
        {(closed || hasReachedTargetRespondents) && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md backdrop-blur-sm bg-black/50 text-neutral-100 z-20">
            <p className="text-center">
              {closed ? "Survey has been closed." : "Survey is over."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

SurveyCard.displayName = "SurveyCard";

export default SurveyCard;
