import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import type { AnswerFormFields, QuestionDTO, QuestionFormFields } from "@inquestia/types";
import { Dot } from "lucide-react";
import type { useAnswerForm } from "../hooks/useAnswerForm";
import { TEXT_ANSWER_MAX, TEXT_ANSWER_MIN } from "@inquestia/constants";

interface AnswerFormCardProps {
  question: QuestionFormFields;
  idx: number;
  answerFormControl: ReturnType<typeof useAnswerForm>['answerFormControl']
}

const QuestionAnswerBaseUI = ({
  question,
  idx,
}: AnswerFormCardProps) => {
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

        <p> {question.type === "select" ? "Choice-based" : "Open-ended"}</p>
      </CardDescription>
    </CardHeader>
  );
};

export const AnswerFormCard = ({
  question,
  idx,
  answerFormControl
}: AnswerFormCardProps) => {
  const num = idx + 1;

  const props = {
    question,
    idx,
    answerFormControl
  };

  const { handleChangeTextAnswer, handleSelectOrDeselectChoice } = answerFormControl;

  return question.type === "text" ? (
    <Card>
      <QuestionAnswerBaseUI {...props} />
      <CardFooter>
        <Textarea
          value={question.answer}
          onChange={handleChangeTextAnswer(idx)}
          placeholder="Type your answer here..."
          minLength={TEXT_ANSWER_MIN}
          maxLength={TEXT_ANSWER_MAX}
        />
      </CardFooter>
    </Card>
  ) : (
    <Card>
      <QuestionAnswerBaseUI {...props} />
      
      <CardFooter className="flex flex-col items-start gap-2">
          <CardDescription>You can pick at most {question.numberOfAnswersAllowed} answer(s)</CardDescription>
        <div className="grid grid-cols-2 gap-2 w-full ">
          <>
            {question.choices.map((c) => (
              <div onClick={() => handleSelectOrDeselectChoice(idx, c)} className={`hover:opacity-50 outline-1 p-2 rounded-lg ${question.answers.includes(c) && 'inquestia-button' }`}>
                {c}
              </div>
            ))}
          </>
        </div>
      </CardFooter>
    </Card>
  );
};
