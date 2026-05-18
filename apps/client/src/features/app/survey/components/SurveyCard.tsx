import { memo, type JSX } from "react";
import SurveyTagList from "./SurveyTagList";
import Bar from "@/components/ui/Bar";
import { formatDistanceToNow } from "date-fns";
import { UserBadge } from "../../../../components/ui/UserBadge";
import { Button } from "../../../../components/ui/button";
import { ChevronRight, Dot, Lock, Tags, UnlockKeyhole } from "lucide-react";
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
import type { Survey, SurveyForm, User } from "@inquestia/schemas";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SurveyCard = memo(({ survey }: { survey: Survey }) => {
  const {
    _id,
    title,
    description,
    questions = [],
    createdAt,
    tags = [],
    targetRespondents = 8,
    totalRespondents,
    isClosed,
    booster = 0,
    isDraft,
    author,
    status,
  } = survey;

  const redirectTo =
    status === "draft" ? `/update/${_id}` : `/survey/published/${_id}`;

  const boostWords: Record<number, string[]> = {
    0: ["V", "A", "P", "O", "R"],
    1: ["G", "L", "I", "M", "M", "E", "R"],
    2: ["F", "L", "A", "R", "E"],
    3: ["B", "L", "A", "Z", "E"],
    4: ["R", "A", "D", "I", "A", "N", "T"],
    5: ["S", "U", "P", "E", "R", "C", "H", "A", "R", "G", "E", "D"],
  };

  return (
    <Link to={redirectTo}>
      <Card className="px-4 bg-zinc-925 h-full w-full">
        <div className="flex gap-4  w-full h-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative outline grid min-h-80 grid-cols-1 grid-rows-1 max-w-6 lg:max-w-12 rounded relative w-full">
                <div
                  className={clsx(
                    "booster-bar z-20 col-span-1 place-self-end row-span-1 col-start-1  row-start-1 -z-20 "
                  )}
                  style={{
                    height: `${booster * 20 || 3}%`,
                  }}
                />
                <div className="flex place-self-center col-span-1 row-span-1 col-start-1 row-start-1  z-20 flex-col pixelify-sans lg:text-2xl text-white h-full items-center justify-center font-bold ">
                  {boostWords[booster]?.map((letter, idx) => (
                    <p className="leading-5" key={`${letter}.${idx}`}>
                      {letter}
                    </p>
                  ))}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>Applied boosters for this survey</TooltipContent>
          </Tooltip>

          <div className="flex shrink w-11/12 justify-between  flex-col gap-2">
            <div className=" w-full mb-2">
              <h1 className="text-2xl tracking-tighter font-bold line-clamp-2">
                {title}
              </h1>
              <p className=" line-clamp-2 tracking-tighter  line-clamp-2">
                {description}
              </p>
            </div>
            <Separator />
            <div className="text-xs pb-2 pt-4 flex items-center w-full gap-4">
              {author && (
                <UserBadge
                  user={author}
                  className="flex items-center justify-between"
                >
                  <div className="flex lg:flex-row items-start flex-col lg:items-center gap-4">
                    <header className="flex items-center gap-4">
                      <UserBadge.Avatar className="size-10" />
                      <div className="flex flex-col ">
                        <UserBadge.Nickname className="font-semibold lg:text-lg" />
                        <UserBadge.Username className="lg:text-base" />
                      </div>
                    </header>

                    <UserBadge.Badge />
                  </div>
                </UserBadge>
              )}
            </div>
            <div className="opacity-80 w-full lg:text-sm truncate flex items-center gap-2 ">
              <p>{formatDistanceToNow(createdAt.toString())} ago</p>
              <Dot />
              <p>{`${questions.length} ${
                questions.length === 1 ? "question" : "questions"
              }`}</p>
            </div>{" "}
            <div className="text-sm flex items-center truncate w-full opacity-80">
              <SurveyTagList tags={tags} />
            </div>
            <div className=" flex gap-2 items-center p-2 ">
              <Bar total={totalRespondents} target={targetRespondents} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
});

SurveyCard.displayName = "SurveyCard";

export default SurveyCard;
