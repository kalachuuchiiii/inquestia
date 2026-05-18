import type {
  useSurveyForm,
  UseSurveyFormReturn,
} from "../hooks/useSurveyForm";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Textarea } from "@/components/ui/textarea";
import {
  BOOSTER_MIN,
  RESPONDENT_COUNT_MAX,
  RESPONDENT_COUNT_MIN,
  TAGS_ENUM,
  type SurveyStatus,
} from "@inquestia/constants";
import { Button } from "@/components/ui/button";
import { _capitalize } from "chart.js/helpers";
import { QuestionForm } from "./QuestionForm";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";
import { useSurveyActions } from "@/features/app/survey/hooks/useSurveyActions";
import { UserBadge } from "@/components/ui/UserBadge";
import clsx from "clsx";
import { useAccount } from "../../account/hooks/useAccount";
import type { ReactNode } from "react";

export const SurveyForm = ({
  footer,
  ...props
}: UseSurveyFormReturn & { footer: ReactNode }) => {
  const { surveyForm, addNewQuestion } = props;
  const { data: user } = useAccount();

  const { register, watch, setValue } = surveyForm;
  const tags = watch("tags");
  const questions = watch("questions");

  if (!user) return;

  return (
    <main className="space-y-4 pb-20">
      <div>
        <header className="my-4">
          <UserBadge
            className="flex items-center gap-2 justify-start px-5 pt-5"
            user={user}
          >
            <UserBadge.Avatar />
            <div>
              <UserBadge.Nickname className="font-semibold" />
              <UserBadge.Username />
            </div>
          </UserBadge>
        </header>
        <Item>
          <ItemContent className="w-full">
            <h1 className="tracking-tight  text-lg"> Survey Title</h1>

            <Textarea
              placeholder="The title of your survey. e.g. User's Experience"
              className="w-full "
              {...register("title")}
            />
          </ItemContent>
        </Item>
        <Item>
          <ItemContent className="w-full">
            <h1 className="tracking-tight  text-lg"> Survey Description</h1>

            <Textarea
              placeholder="The description of your survey. e.g. This survey aims to..."
              className="w-full min-h-30"
              {...register("description")}
            />
          </ItemContent>
        </Item>
      </div>

      <div>
        <Item>
          <ItemContent>
            <h1 className="tracking-tight  text-lg">Target respondents</h1>
            <ItemDescription>Desired number of respondents</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Input
              className="w-30"
              {...register("targetRespondents")}
              min={RESPONDENT_COUNT_MIN}
              max={RESPONDENT_COUNT_MAX}
              type="number"
            />
          </ItemActions>
        </Item>
      </div>

      <div>
        <Item>
          <ItemContent>
            <h1 className="tracking-tight  text-lg">Tags</h1>
            <ItemDescription>
              {tags.length > 0
                ? tags.map(_capitalize).join(", ")
                : "Select tags"}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger>
                <Button variant={"outline"}>Select</Button>
              </DialogTrigger>
              <DialogContent className="overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Select tags</DialogTitle>
                  <DialogDescription>
                    This will help us deliver your survey to the right people!
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="w-full h-[70vh] ">
                  {TAGS_ENUM.map((tag) => (
                    <Button
                      variant={tags.includes(tag) ? "default" : "outline"}
                      onClick={() => setValue("tags", [...tags, tag])}
                      className={`rounded-lg m-1`}
                    >
                      {_capitalize(tag)}
                    </Button>
                  ))}
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </ItemActions>
        </Item>
      </div>
      <div>
        <Item>
          <ItemContent>
            <h1 className="tracking-tight  text-lg">Survey boost</h1>
            <ItemDescription>
              Survey algorithm chance multiplier
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Input
              {...register("booster")}
              className="w-30"
              min={BOOSTER_MIN}
              max={user.boosterPoint}
              type="number"
            />
          </ItemActions>
        </Item>
      </div>
      <Carousel className="space-y-2 my-6">
        <CarouselContent>
          {questions.map((q, idx) => (
            <CarouselItem className="w-9/12" key={idx}>
              <QuestionForm {...props} idx={idx} question={q} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {questions.length > 1 && (
        <ItemDescription className="text-center flex items-center gap-2 justify-center mx-auto">
          {questions.length} questions{" "}
          <div className="flex items-center">
            <ChevronRight className="size-6" />{" "}
            <ChevronRight className="size-6 opacity-50" />
          </div>
        </ItemDescription>
      )}
      <footer className="my-4 items-center flex justify-end gap-6">
        <Dialog>
          <DialogContent>
            <DialogTitle>What kind of question?</DialogTitle>
            <DialogDescription>
              Open-ended: People can freely express their answers
            </DialogDescription>
            <DialogDescription>
              Choice-based: People can choose their answers
            </DialogDescription>
            <DialogFooter>
              <Button
                variant={"outline"}
                onClick={() => addNewQuestion("open_ended")}
              >
                Open-ended
              </Button>
              <Button
                variant={"outline"}
                onClick={() => addNewQuestion("close_ended")}
              >
                Choice-based
              </Button>
            </DialogFooter>
          </DialogContent>
          <DialogTrigger>
            <Button variant={"outline"}>Add question</Button>
          </DialogTrigger>
        </Dialog>

        {footer}
      </footer>
    </main>
  );
};
