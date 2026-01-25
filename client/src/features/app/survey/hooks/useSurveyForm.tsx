import type { TextInput } from "@/types";
import {
  BOOSTER_MIN,
  TAGS_ENUM,
  TAGS_MAX,
  TAGS_MIN,
  TARGET_RESPONDENTS_MIN,
} from "@shared/constants";
import { TagsSchema } from "@shared/schemas";
import type {
  SelectTypeQuestionDTO,
  SurveyForm,
  TextTypeQuestionDTO,
} from "@shared/types/survey";
import { pre } from "framer-motion/client";
import { Tags } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useImmer } from "use-immer";

type TagEnum = (typeof TAGS_ENUM)[number];
export const useSurveyForm = () => {
  //ts has this issue that tags type is any[] so i had to explicitly type it here on client
  const [surveyForm, setSurveyForm] = useImmer<SurveyForm>({
    title: "",
    description: "",
    tags: [],
    questions: [],
    targetRespondents: TARGET_RESPONDENTS_MIN,
    isDraft: false,
    booster: BOOSTER_MIN,
  });

  const handleChange = (e: TextInput) => {
    //for title, desc
    const { name, value, type } = e.target;

    setSurveyForm((draft) => {
      draft[name as "title" | "description"] = value;
    });
  };

  const handleSelectAndDeselectTag = (tag: TagEnum) => {
    if (surveyForm.tags.includes(tag)) {
      setSurveyForm((draft) => {
        draft.tags = draft.tags.filter((t) => t !== tag);
      });
    } else {
      if (surveyForm.tags.length === TAGS_MAX) {
        return;
      }
      setSurveyForm((draft) => {
        draft.tags.push(tag);
      });
    }
  };

  const handleToggleIsDraft = () => {
    setSurveyForm((draft) => {
      draft.isDraft = !draft.isDraft;
    });
  };

  const handleToggleIsRequired = (idx: number) => {
    setSurveyForm((draft) => {
      draft.questions[idx].isRequired = !draft.questions[idx].isRequired;
    });
  };

  const handleAddTextTypeQuestion = () => {
    const textTypeQuestion: TextTypeQuestionDTO = {
      question: "",
      type: "text",
      isRequired: true,
    };
    setSurveyForm((draft) => {
      draft.questions.push(textTypeQuestion);
    });
  };

  const handleAddSelectTypeQuestion = () => {
    const selectTypeQuestion: SelectTypeQuestionDTO = {
      question: "",
      choices: [],
      multipleChoice: false,
      type: "select",
      isRequired: true,
    };

    setSurveyForm((draft) => {
      draft.questions.push(selectTypeQuestion);
    });
  };

  const handleChangeQuestion = (idx: number) => (e: TextInput) => {
    const { value } = e.target;
    setSurveyForm((draft) => {
      draft.questions[idx].question = value;
    });
  };

  const handleAddChoice = (idx: number, choice: string) => {
    setSurveyForm((draft) => {
      const question = draft.questions[idx];
      const questionType = question.type;
      if (questionType !== "select" || question.choices.includes(choice))
        return;
      question.choices.push(choice);
    });
  };

  const handleRemoveChoice = (idx: number, choice: string) => {
    setSurveyForm((draft) => {
      const question = draft.questions[idx];
      const questionType = question.type;
      if (questionType !== "select") return;
      question.choices = question.choices.filter((c) => c !== choice);
    });
  };

  const handleToggleIsMultipleChoice = (idx: number) => {
    setSurveyForm((draft) => {
      const question = draft.questions[idx];
      const questionType = question.type;
      if (questionType !== "select") return;
      question.multipleChoice = !question.multipleChoice;
    });
  };

  const handleChangeNumbers = (e: TextInput) => {
    const { name, value } = e.target;
     setSurveyForm((draft) => {
      draft[name as 'booster' | 'targetRespondents'] = parseInt(value);
     } )
  }

  const handleRemoveQuestion = (idx: number) => {
    setSurveyForm((draft) => {
      draft.questions.splice(idx, 1);
    })
  }

  return {
    surveyForm,
    handleChange,
    handleSelectAndDeselectTag,
    handleToggleIsDraft,
    handleAddTextTypeQuestion,
    handleAddSelectTypeQuestion,
    handleChangeNumbers,
    questionControl: {
      handleToggleIsMultipleChoice,
       handleRemoveQuestion,
      handleRemoveChoice,
      handleAddChoice,
      handleChangeQuestion,
      handleToggleIsRequired,
    },
  };
};
