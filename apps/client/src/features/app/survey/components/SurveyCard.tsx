import { memo, type JSX } from "react";
import type { SurveyDTO } from "@inquestia/types";
import SurveyTagList from "./SurveyTagList";
import Bar from "@/components/ui/Bar";
import { formatDistanceToNow } from "date-fns";
import { UserBadge } from "../../../../components/ui/UserBadge";
import { Button } from "../../../../components/ui/button";
import { ChevronRight, Dot, Lock, UnlockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "../../../../components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import clsx from "clsx";

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
    booster,
    isDraft,
    author,
  } = survey;

  const redirectTo = isDraft
    ? `/survey/drafts/${_id}`
    : `/survey/published/${_id}`;
  const redirectDisplay = isDraft ? "View Draft" : "View Survey";
  const boostLetters = ["B", "O", "O", "S", "T", "!"];

  const boostWords: Record<number, string[]> = {
    0: ["V", "A", "P", "O", "R"],
    1: ["G", "L", "I", "M", "M", "E", "R"],
    2: ["F", "L", "A", "R", "E"],
    3: ["B", "L", "A", "Z", "E"],
    4: ["R", "A", "D", "I", "A", "N", "T"],
    5: ["S", "U", "P", "E", "R", "C", "H", "A", "R", "G", "E", "D"],
  };

  return (
    <Card className="px-4 w-full">
      <div className="flex gap-2  w-full h-full">
        <div className="relative max-w-12 w-full">
          <div className={clsx("booster-bar ", `h-${booster * 20}`)} />
          <div className="flex absolute top-0 left-3 flex-col pixelify-sans lg:text-2xl text-white h-full items-center justify-center font-bold ">
            {boostWords[booster].map((letter, idx) => (
              <p key={`${letter}.${idx}`}>{letter}</p>
            ))}
          </div>
        </div>

        <div className="flex shrink w-11/12 flex-col gap-2">
          <Card className="bg-muted w-full">
            <CardHeader>
              <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
              <CardDescription className=" line-clamp-2">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {questions.slice(0, 3).map((q: any, i: number) => (
                <div className="text-base opacity-80 italic" key={i}>
                  Question {i + 1}: {q?.question}
                </div>
              ))}
              {questions.length > 3 && (
                <p>... and {questions.length - 3} more</p>
              )}
            </CardContent>
          </Card>
          <div className="text-xs pb-2 pt-4 flex items-center w-full gap-4 border-t border-gray-200 dark:border-gray-800">
            <UserBadge
              user={author}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <UserBadge.Avatar className="size-10" />
                <div className="flex flex-col ">
                  <UserBadge.Nickname className="font-semibold lg:text-lg" />
                  <UserBadge.Username className="lg:text-base" />
                </div>
                <UserBadge.Badge />
              </div>
            </UserBadge>
            <Separator orientation="vertical" />
            <div className="opacity-80 w-full lg:text-lg truncate flex items-center gap-2 ">
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
                  {isClosed ? <Lock /> : <UnlockKeyhole />}
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
    </Card>
  );
});

SurveyCard.displayName = "SurveyCard";

export default SurveyCard;
