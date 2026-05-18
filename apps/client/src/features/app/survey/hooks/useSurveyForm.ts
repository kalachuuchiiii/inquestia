import {
  BOOSTER_MIN,
  RESPONDENT_COUNT_MIN,
  type QuestionType,
} from "@inquestia/constants";
import type {
  CloseEndedQuestion,
  OpenEndedQuestion,
  Question,
  SurveyForm,
} from "@inquestia/schemas";
import type { SurveyQuestionType } from "posthog-js";
import { useFieldArray, useForm, type UseFormReturn } from "react-hook-form";

const openEndedQuestion: OpenEndedQuestion = {
  question: "",
  type: "open_ended",
  isRequired: true,
};
const closeEndedQuestion: CloseEndedQuestion = {
  question: "",
  choices: [],
  numberOfAnswersAllowed: 1,
  type: "close_ended",
  isRequired: true,
};

export const useSurveyForm = () => {
  const surveyForm = useForm<SurveyForm>({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      questions: [],
      targetRespondents: RESPONDENT_COUNT_MIN,
      isDraft: false,
      status: "published",
      booster: BOOSTER_MIN,
    },
  });
  const { control } = surveyForm;

  const questionsFieldArray = useFieldArray({
    control,
    name: "questions",
  });

  const addNewQuestion = (type: QuestionType) => {
    const { append } = questionsFieldArray;

    append(type === "close_ended" ? closeEndedQuestion : openEndedQuestion);
  };
  const removeQuestion = (idx: number) => {
    const { remove } = questionsFieldArray;
    remove(idx);
  };

  const toggleIsRequired = (idx: number) => {
    const { update } = questionsFieldArray;
    const value = surveyForm.watch(`questions.${idx}`);
    update(idx, { ...value, isRequired: !value.isRequired });
  };

  const addChoice = (idx: number, choice: string) => {
    const { update } = questionsFieldArray;
    const value = surveyForm.watch(`questions.${idx}`);
    if (value.type !== "close_ended" || value.choices.includes(choice)) return;
    update(idx, { ...value, choices: [...value.choices, choice] });
  };

  const removeChoice = (idx: number, choice: string) => {
    const { update } = questionsFieldArray;
    const value = surveyForm.watch(`questions.${idx}`);
    if (value.type !== "close_ended" || !value.choices.includes(choice)) return;
    update(idx, {
      ...value,
      choices: value.choices.filter((c) => c !== choice),
    });
  };

  return {
    surveyForm,
    addNewQuestion,
    removeQuestion,
    toggleIsRequired,
    addChoice,
    removeChoice,
    questionsFieldArray,
  };
};

export type UseSurveyFormReturn = ReturnType<typeof useSurveyForm>;
