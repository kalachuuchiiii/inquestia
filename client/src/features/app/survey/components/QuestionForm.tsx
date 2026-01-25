import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  SelectTypeQuestionForm,
  TextTypeQuestionForm,
} from "@shared/types";
import type { useSurveyForm } from "../hooks/useSurveyForm";
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

interface QuestionFormProps {
  question: TextTypeQuestionForm | SelectTypeQuestionForm;
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
  const { handleToggleIsMultipleChoice, handleAddChoice, handleRemoveChoice } =
    questionControl;

  return question.type === "select" ? (
    <Card >
      <QuestionBaseUI
        question={question}
        questionControl={questionControl}
        idx={idx}
      />
      <CardContent
        className={`flex items-center ${
          !question.multipleChoice && "opacity-50"
        } gap-2`}
      >
        <Switch
          checked={question.multipleChoice}
          onCheckedChange={() => handleToggleIsMultipleChoice(idx)}
        />{" "}
        Allow respondents to select multiple choices
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2 w-full">
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
