import { memo, type JSX } from "react";
import type { SurveyDTO } from "@shared/types";
import SurveyTagList from "../lists/SurveyTagList";
import Bar from "../html/Bar";
import { formatDistanceToNow } from "date-fns";
import { UserBadge } from "../UserBadge";
import ArrowButton from "../html/ArrowButton";
import { Button } from "../ui/button";
import { ChevronRight, Dot, Lock, UnlockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "../ui/button-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

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
    isClosed,
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
        <Card className="bg-muted">
          <CardHeader>
             <CardTitle className="text-xl" >{title}</CardTitle>
          <CardDescription className=" line-clamp-2">
            {description}
          </CardDescription>
          </CardHeader>
          <CardContent >
            {questions.slice(0, 3).map((q: any, i: number) => (
              <div className="text-base opacity-80 italic" key={i}>
                Question {i + 1}: {q?.question}
              </div>
            ))}
            {questions.length > 3 && <p>... and {questions.length - 3} more</p>}
          </CardContent>
        </Card>
        <div className="text-xs pb-2 pt-4 flex items-center w-full gap-4 border-t border-gray-200 dark:border-gray-800">
          <UserBadge displayBadge user={author} />
          <Separator orientation="vertical" />
          <div className="opacity-80 w-full truncate flex items-center gap-2 ">
            <p>{formatDistanceToNow(createdAt.toString())} ago</p>
             <Dot />
            <p>{`${questions.length} ${
              questions.length === 1 ? "question" : "questions"
            }`}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pb-2 py-4 rounded border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm w-full opacity-80">
            <SurveyTagList tags={tags as any} />
          </div>
        </div>
        <div className="border-t border-gray-200 flex gap-2 items-center dark:border-gray-800 p-2 bg-gradient-to-t from-zinc-50 dark:from-zinc-950">
          <Bar total={totalRespondents} target={targetRespondents} />
          <Link to={redirectTo}>
            <ButtonGroup>
              <ButtonGroupText>
                  { isClosed ? <Lock /> : <UnlockKeyhole />}
              </ButtonGroupText>
              <ButtonGroupSeparator />
              <Button variant={"outline"}>
                <p>{redirectDisplay}</p>
                <ChevronRight />
              </Button>
            </ButtonGroup>
          </Link>
        </div>
      </div>
    </div>
  );
});

SurveyCard.displayName = "SurveyCard";

export default SurveyCard;
