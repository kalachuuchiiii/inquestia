import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSurveyForm } from "../hooks/useSurveyForm";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { SelectTypeQuestionDTO, TextTypeQuestionDTO } from "@inquestia/types";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Input } from "@/components/ui/input";

interface QuestionFormProps {
  question: TextTypeQuestionDTO | SelectTypeQuestionDTO;
  questionControl: ReturnType<typeof useSurveyForm>["questionControl"];
  idx: number;
}

const QuestionBaseUI = ({
  question,
  questionControl,
  idx,
}: QuestionFormProps) => {
  const { handleChangeQuestion, handleToggleIsRequired, handleRemoveQuestion } =
    questionControl;

  const number = idx + 1;

  return (
    <>
      <CardHeader>
        <div className="flex w-full justify-between  items-center">
          <div className="space-y-1">
            <CardTitle>Survey Question {number}</CardTitle>
            <CardDescription>
              {question.type === "select"
                ? "Choice-based question"
                : "Open-ended question"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-8 text-sm">
            <div
              className={`space-x-2 ${
                !question.isRequired && "opacity-50"
              } flex items-center gap-2`}
            >
              <CardTitle>
                {" "}
                <span className={`text-red-400 mx-2  `}>*</span>Required
              </CardTitle>

              <Switch
                checked={question.isRequired}
                onCheckedChange={() => handleToggleIsRequired(idx)}
              />
            </div>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => handleRemoveQuestion(idx)}
                  variant={"outline"}
                  className="text-red-400"
                >
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove question</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Your question here..."
          value={question.question}
          onChange={handleChangeQuestion(idx)}
        />
      </CardContent>
    </>
  );
};

const SelectTypeQuestionForm = ({
  questionControl,
  idx,
  question,
}: QuestionFormProps) => {
  const [choice, setChoice] = useState("");
  const { handleChangeNumberOfAnswersAllowed, handleAddChoice, handleRemoveChoice } =
    questionControl;

  return question.type === "select" ? (
    <Card >
      <QuestionBaseUI
        question={question}
        questionControl={questionControl}
        idx={idx}
      />
    
      <CardFooter>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full gap-2 flex items-center justify-start">
       
         <Input className="w-16" value={question.numberOfAnswersAllowed} onChange={handleChangeNumberOfAnswersAllowed(idx)} type = 'number' min = {1} max = {question.choices.length} />
              <p className="opacity-50 text-sm">  Number of answers allowed (it must be less than or equal of choice count )</p>
         
    
            
         
          </div>
          <InputGroup>
            <InputGroupInput
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              placeholder="Create a new choice"
            />
            <InputGroupButton onClick={() => handleAddChoice(idx, choice)}>
              <Plus />
            </InputGroupButton>
          </InputGroup>
          <div className=" divide-y-1">
            {question.choices.map((c) => (
              <div className="flex items-center hover:opacity-50 transition-all duration-200 justify-between">
                <p>{c}</p>
                <Button
                  onClick={() => handleRemoveChoice(idx, c)}
                  variant={"outline"}
                >
                  {" "}
                  <X />{" "}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  ) : (
    <></>
  );
};

export const QuestionForm = ({
  question,
  questionControl,
  idx,
}: QuestionFormProps) => {
  const UIProps = {
    question,
    questionControl,
    idx,
  };
  return question.type === "text" ? (
    <Card>
      <QuestionBaseUI {...UIProps} />
    </Card>
  ) : (
    <SelectTypeQuestionForm {...UIProps} />
  );
};
