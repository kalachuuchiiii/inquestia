import type { TextInput } from "@/types";
import type { AnswerForm } from "@inquestia/schemas";
import { useFieldArray, useForm } from "react-hook-form";

import { useImmer } from "use-immer";

export const useAnswerFormController = () => {
  const answerForm = useForm<AnswerForm>({
    defaultValues: {
      surveyId: "",
      responses: [],
      isAnonymous: false,
    },
  });

  const { watch, getValues } = answerForm;
  const responsesForm = useFieldArray({
    control: answerForm.control,
    name: "responses",
  });
  const { append, update } = responsesForm;

  const toggleChoiceAt = (idx: number, choice: string) => {
    const values = watch(`responses.${idx}`);
    if (values.type !== "close_ended") return;
    const { choices, numberOfAnswersAllowed, answers } = values;

    let tempAnswers = [];
    if (answers.includes(choice)) {
      tempAnswers = answers.filter((a) => a !== choice);
    } else {
      tempAnswers = [...answers, choice];
    }

    update(idx, {
      ...values,
      answers: tempAnswers,
    });
  };

  const toggleAnonyminityAt = () => {
    const value = getValues().isAnonymous;
    answerForm.setValue("isAnonymous", !value);
  };

  return {
    answerForm,
    responsesForm,
    toggleAnonyminityAt,
    toggleChoiceAt,
  };
};

export type useAnswerFormControllerReturn = ReturnType<
  typeof useAnswerFormController
>;
