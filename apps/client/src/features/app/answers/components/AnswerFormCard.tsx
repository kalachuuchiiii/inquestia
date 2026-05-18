import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { Dot } from "lucide-react";
import type {
  useAnswerFormController,
  useAnswerFormControllerReturn,
} from "../hooks/useAnswerForm";
import { TEXT_ANSWER_MAX, TEXT_ANSWER_MIN } from "@inquestia/constants";
import type { Response } from "@inquestia/schemas";

type AnswerFormCardProps = {
  question: Response;
  idx: number;
} & useAnswerFormControllerReturn;

const QuestionAnswerBaseUI = ({ question, idx }: AnswerFormCardProps) => {
  const num = idx + 1;

  return (
    <CardHeader>
      <CardTitle>
        {num}). {question.question}
      </CardTitle>
      <CardDescription className="flex items-center gap-1">
        <>
          {question.isRequired && (
            <>
              <p className="text-sm">
                {" "}
                <span className="text-red-400">*</span> Required
              </p>
              <Dot />
            </>
          )}
        </>

        <p>
          {" "}
          {question.type === "close_ended" ? "Choice-based" : "Open-ended"}
        </p>
      </CardDescription>
    </CardHeader>
  );
};

export const AnswerFormCard = ({ ...props }: AnswerFormCardProps) => {
  const { question, idx, answerForm, toggleChoiceAt } = props;
  const response = answerForm.watch(`responses.${idx}`);
  const answers =
    response.type === "close_ended" ? response.answers : response.answer;

  return question.type === "open_ended" && response.type === "open_ended" ? (
    <Card className="dark:bg-zinc-925 bg-neutral-100">
      <QuestionAnswerBaseUI {...props} />
      <CardFooter>
        <Textarea
          {...answerForm.register(`responses.${idx}.answer`)}
          placeholder="Type your answer here..."
          minLength={TEXT_ANSWER_MIN}
          maxLength={TEXT_ANSWER_MAX}
        />
      </CardFooter>
    </Card>
  ) : (
    question.type === "close_ended" && response.type === "close_ended" && (
      <Card className="dark:bg-zinc-925 bg-neutral-100">
        <QuestionAnswerBaseUI {...props} />

        <CardFooter className="flex flex-col items-start gap-2">
          <CardDescription>
            You can pick at most {question.numberOfAnswersAllowed} answer(s)
          </CardDescription>
          <div className="grid grid-cols-2 gap-2 w-full ">
            <>
              {question.choices.map((c) => (
                <Button
                  onClick={() => toggleChoiceAt(idx, c)}
                  variant={answers.includes(c) ? "default" : "outline"}
                >
                  {c}
                </Button>
              ))}
            </>
          </div>
        </CardFooter>
      </Card>
    )
  );
};
