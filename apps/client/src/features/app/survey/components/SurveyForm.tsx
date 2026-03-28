
import type { useSurveyForm } from "../hooks/useSurveyForm";
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
  DESCRIPTION_MSG,
  TAGS_ENUM,
  TARGET_RESPONDENTS_MAX,
  TARGET_RESPONDENTS_MIN,
  TITLE_MSG,
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

type SurveyFormProps = ReturnType<typeof useSurveyForm>;

export const SurveyForm = ({
  surveyForm,
  questionControl,
  handleChange,
  handleChangeNumbers,
  handleSelectAndDeselectTag,
  handleAddSelectTypeQuestion,
  handleAddTextTypeQuestion,
  handleToggleIsDraft,
}: SurveyFormProps) => {
  const { user } = useAppSelector((state) => state.user);
  const { saveAsDraft, createSurvey, isCreatingSurvey, isSavingAsDraft } =
    useSurveyActions();

  return (
  
      <main className="space-y-4 pb-20">
        <div className="my-card">
          <header className="my-4">
            <UserBadge className="flex items-center gap-2 justify-start px-5 pt-5" user={user} >
              <UserBadge.Avatar />
              <div>
                <UserBadge.Nickname className="font-semibold" />
                <UserBadge.Username />
              </div>
              
            </UserBadge>
          </header>
          <Item>
            <ItemContent className="w-full">
              <ItemTitle> Survey Title</ItemTitle>

              <Textarea
                className="w-full "
                placeholder={TITLE_MSG.range}
                value={surveyForm.title}
                name="title"
                onChange={handleChange}
              />
            </ItemContent>
          </Item>
          <Item>
            <ItemContent className="w-full">
              <ItemTitle> Survey Description</ItemTitle>

              <Textarea
                className="w-full min-h-30"
                placeholder={DESCRIPTION_MSG.range}
                value={surveyForm.description}
                name="description"
                onChange={handleChange}
              />
            </ItemContent>
          </Item>
        </div>
     

        <div className="my-card">
          <Item>
            <ItemContent>
              <ItemTitle>Target respondents</ItemTitle>
              <ItemDescription>Desired number of respondents</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Input
                className="w-30"
                onChange={handleChangeNumbers}
                name="targetRespondents"
                value={surveyForm.targetRespondents}
                min={TARGET_RESPONDENTS_MIN}
                max={TARGET_RESPONDENTS_MAX}
                type="number"
              />
            </ItemActions>
          </Item>
        </div>
        

        <div className="my-card">
          <Item>
            <ItemContent>
              <ItemTitle>Tags</ItemTitle>
              <ItemDescription>
                {surveyForm.tags.length > 0 ? surveyForm.tags.map(_capitalize).join(", ") : 'Select tags'}
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
                        onClick={() => handleSelectAndDeselectTag(tag)}
                        className={`${
                          surveyForm.tags.includes(tag)
                            ? "inquestia-button"
                            : ""
                        } rounded-lg m-1`}
                        variant="outline"
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
           <div className={clsx("my-card", surveyForm.isDraft && 'opacity-50 disabled')}>
          <Item>
            <ItemContent>
              <ItemTitle>Survey boost</ItemTitle>
              <ItemDescription>
                Survey algorithm chance multiplier
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Input
               disabled = {surveyForm.isDraft}
                className="w-30"
                onChange={handleChangeNumbers}
                name="booster"
                min={BOOSTER_MIN}
                max={user.boosterPoint}
                value={surveyForm.booster}
                type="number"
              />
            </ItemActions>
          </Item>
        </div>
        <Carousel className="space-y-2 my-6">
          <CarouselContent>
            {surveyForm.questions.map((q, idx) => (
              <CarouselItem className="w-9/12" key={idx}>
                <QuestionForm
                  questionControl={questionControl}
                  idx={idx}
                  question={q}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {surveyForm.questions.length > 1 && (
          <ItemDescription className="text-center flex items-center gap-2 justify-center mx-auto">
            {surveyForm.questions.length} questions{" "}
            <div className="flex items-center">
              <ChevronRight className="size-6" />{" "}
              <ChevronRight className="size-6 opacity-50" />
            </div>
          </ItemDescription>
        )}
        <footer className="my-4 items-center flex justify-end gap-6">
          <div className="flex items-center my-2 gap-2">
            <Switch
              checked={surveyForm.isDraft}
              onCheckedChange={handleToggleIsDraft}
            />
            <p>Save as draft</p>
          </div>
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
                <Button variant={"outline"} onClick={handleAddTextTypeQuestion}>
                  Open-ended
                </Button>
                <Button
                  variant={"outline"}
                  onClick={handleAddSelectTypeQuestion}
                >
                  Choice-based
                </Button>
              </DialogFooter>
            </DialogContent>
            <DialogTrigger>
              <Button variant={"outline"}>Add question</Button>
            </DialogTrigger>
          </Dialog>
          {surveyForm.isDraft ? (
            <Button
              onClick={() => saveAsDraft(surveyForm)}
              disabled={isSavingAsDraft || isCreatingSurvey}
              className="inquestia-button w-30"
            >
              Save as draft
            </Button>
          ) : (
            <Dialog>
              <DialogContent>
                <DialogTitle>Publish Survey?</DialogTitle>
                <DialogDescription>This is not a draft</DialogDescription>
                <DialogFooter>
                  <DialogClose>
                    <Button variant={"outline"}>Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={() => createSurvey(surveyForm)}
                    disabled={isSavingAsDraft || isCreatingSurvey}
                    className="inquestia-button"
                  >
                    Publish
                  </Button>
                </DialogFooter>
              </DialogContent>
              <DialogTrigger>
                <Button className="inquestia-button w-30">
                  Publish Survey
                </Button>
              </DialogTrigger>
            </Dialog>
          )}
        </footer>
      </main>
  );
};
