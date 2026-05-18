import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  useSurveyForm,
  type UseSurveyFormReturn,
} from "../hooks/useSurveyForm";
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
import { Input } from "@/components/ui/input";
import type {
  CloseEndedQuestion,
  OpenEndedQuestion,
  Question,
} from "@inquestia/schemas";

type QuestionFormProps = UseSurveyFormReturn & {
  question: Question;
  idx: number;
};

const QuestionFormBaseUI = ({
  question,
  surveyForm,
  idx,
  toggleIsRequired,
  removeQuestion,
}: QuestionFormProps) => {
  const number = idx + 1;
  const { register } = surveyForm;

  return (
    <>
      <CardHeader>
        <div className="flex w-full justify-between  items-center">
          <div className="space-y-1">
            <CardTitle>Survey Question {number}</CardTitle>
            <CardDescription>
              {question.type === "close_ended"
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
                onCheckedChange={() => toggleIsRequired(idx)}
              />
            </div>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => removeQuestion(idx)}
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
          {...register(`questions.${idx}.question`)}
        />
      </CardContent>
    </>
  );
};

const CloseEndedForm = ({ ...props }: QuestionFormProps) => {
  const [choice, setChoice] = useState("");
  const { surveyForm, idx, question, removeChoice, addChoice } = props;
  const { register, watch } = surveyForm;
  const type = watch(`questions.${idx}.type`);

  return question.type === "close_ended" && type === "close_ended" ? (
    <Card className="bg-zinc-925">
      <QuestionFormBaseUI {...props} />
      <CardFooter>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full gap-2 flex items-center justify-start">
            <Input
              className="w-16"
              {...register(`questions.${idx}.numberOfAnswersAllowed`)}
              type="number"
            />
            <p className="opacity-50 text-sm">
              {" "}
              Number of answers allowed (it must be less than or equal of choice
              count )
            </p>
          </div>
          <InputGroup>
            <InputGroupInput
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              placeholder="Create a new choice"
            />
            <InputGroupButton onClick={() => addChoice(idx, choice)}>
              <Plus />
            </InputGroupButton>
          </InputGroup>
          <div className=" divide-y-1">
            {question.choices.map((c) => (
              <div className="flex items-center hover:opacity-50 transition-all duration-200 justify-between">
                <p>{c}</p>
                <Button
                  onClick={() => removeChoice(idx, c)}
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

export const QuestionForm = ({ ...props }: QuestionFormProps) => {
  const { type } = props.question;

  return type === "open_ended" ? (
    <Card className="bg-zinc-925">
      <QuestionFormBaseUI {...props} />
    </Card>
  ) : (
    <CloseEndedForm {...props} />
  );
};
