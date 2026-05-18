import SurveyTagList from "@/features/app/survey/components/SurveyTagList.js";
import { Button, Button as SubmissionButton } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import { BsDownload } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { UserBadge } from "@/components/ui/UserBadge.js";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.js";
import { formatDistanceToNow } from "date-fns";
import useAnswerSurvey from "@/features/app/answers/hooks/useAnswerSurvey.js";
import {
  ChevronRight,
  Flag,
  RectangleGoggles,
  RectangleGogglesIcon,
  Trash2,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.js";

import { Link, useParams } from "react-router-dom";
import { SurveyActions } from "@/features/app/survey/components/SurveyActions.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { AnswerFormCard } from "@/features/app/answers/components/AnswerFormCard.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.js";
import { useCarouselIndex } from "@/hooks/useCarouselIndex.js";
import LoadingDisplay from "@/components/ui/LoadingDisplay.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.js";
import { useAnswerActions } from "@/features/app/answers/hooks/useAnswerActions.js";
import { Switch } from "@/components/ui/switch.js";
import { _capitalize } from "chart.js/helpers";
import SearchUserDialogContent from "../components/SearchUserDialogContent";
import type { User } from "@inquestia/schemas";
import { useAccount } from "../../account/hooks/useAccount";

const AnswerSurveyPage = () => {
  const {
    survey,
    isFetchingSurvey,
    formController,
    onAnswerSubmit,
    answerActions,
  } = useAnswerSurvey();
  const { toggleAnonyminityAt } = formController;
  const { isSubmissionPending } = answerActions;
  const { setApi, index } = useCarouselIndex();
  const { data: user } = useAccount();
  const responses = formController.answerForm.watch("responses");
  const isAnonymous = formController.answerForm.watch("isAnonymous");

  const qrParent = useRef<HTMLDivElement>(null);

  const downloadQr = () => {
    if (!qrParent.current) return;
    const canvas = qrParent.current.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = `survey-${survey?._id}-qr.png`;
    a.click();
  };

  if (isFetchingSurvey || !survey || !user) {
    return <LoadingDisplay />;
  }

  return (
    <div className=" px-1">
      <main className="min-h-screen ">
        <CardHeader className="flex items-start  justify-between">
          <div className="flex gap-3 items-center">
            <UserBadge
              user={survey.author as User}
              className="flex items-center justify-between"
            >
              <div className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
                <div className="flex items-center gap-4">
                  <UserBadge.Avatar className="size-10" />
                  <div className="flex  flex-col ">
                    <UserBadge.Nickname className="font-semibold lg:text-lg" />
                    <UserBadge.Username className="lg:text-base" />
                  </div>
                </div>
                <UserBadge.Badge />
              </div>
            </UserBadge>
          </div>

          <SurveyActions user={user} survey={survey} />
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div className="flex gap-2 justify-between w-full items-start">
            <div className=" space-y-4 my-6 w-full">
              <div className="w-full  ">
                <ScrollArea className=" p-0 w-full">
                  <header className="w-full ">
                    <h1 className="text-3xl tracking-tighter font-bold">
                      {survey.title}
                    </h1>
                    <p className="text-lg tracking-tighter  opacity-80">
                      {survey.description}
                    </p>
                  </header>
                </ScrollArea>
              </div>
              <CardDescription className="flex items-center gap-2">
                <p>
                  {_capitalize(
                    formatDistanceToNow(survey.createdAt.toString())
                  )}{" "}
                  ago
                </p>
                <div className="h-1 w-1 rounded-full bg-current opacity-50" />
                <p>{survey.questions.length} Question(s)</p>
              </CardDescription>
              <SurveyTagList tags={survey.tags} />
            </div>
          </div>
        </CardContent>
        <Carousel setApi={setApi} className="p-4 space-y-2">
          <CarouselContent>
            {responses.map((q, idx) => (
              <CarouselItem key={idx}>
                <AnswerFormCard question={q} idx={idx} {...formController} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="text-center w-full text-sm gap-2 flex items-center justify-center ">
          <ChevronRight size="20" />
          <p>
            {index + 1} / {survey.questions.length}
          </p>
          <ChevronRight size="20" className="opacity-50" />
        </div>

        <div className="w-8/12 mx-auto flex flex-col items-center gap-2 p-4">
          <Dialog>
            <DialogTrigger>
              <Button
                disabled={survey.questions.length === 0}
                className="inquestia-button mx-auto"
              >
                Submit Answer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publish survey?</DialogTitle>
                <DialogDescription>
                  You can't longer delete nor edit this later on
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col w-full items-start justify-start gap-1 ">
                <div className="flex items-center justify-start w-full gap-2">
                  <Switch
                    checked={isAnonymous}
                    onCheckedChange={toggleAnonyminityAt}
                  />
                  <p>Anonymous</p>
                </div>
                <DialogDescription>
                  You won't be able to see this answer of yours, However, This
                  will allow you to answer surveys with complete anonyminity
                </DialogDescription>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button
                  className="inquestia-button"
                  onClick={() => onAnswerSubmit()}
                  disabled={isSubmissionPending}
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default AnswerSurveyPage;
