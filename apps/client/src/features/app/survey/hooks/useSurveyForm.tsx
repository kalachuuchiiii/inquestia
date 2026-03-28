import type { TextInput } from "@/types";
import {
  BOOSTER_MIN,
  TAGS_ENUM,
  TAGS_MAX,
  TAGS_MIN,
  TARGET_RESPONDENTS_MIN,
} from "@inquestia/constants";
import { TagsSchema } from "@inquestia/schemas";
import type {
  SelectTypeQuestionDTO,
  SurveyForm,
  TextTypeQuestionDTO,
} from "@inquestia/types";
import { useImmer } from "use-immer";

type TagEnum = (typeof TAGS_ENUM)[number];
export const useSurveyForm = () => {
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
      draft.booster = 0;
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
      numberOfAnswersAllowed: 1,
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

  const handleChangeNumberOfAnswersAllowed =
    (idx: number) => (e: TextInput) => {
      setSurveyForm((draft) => {
        const question = draft.questions[idx];
        const questionType = question.type;
        if (questionType !== "select") return;
        question.numberOfAnswersAllowed = parseInt(e.target.value);
      });
    };

  const handleChangeNumbers = (e: TextInput) => {
    const { name, value } = e.target;
    setSurveyForm((draft) => {
      draft[name as "booster" | "targetRespondents"] = parseInt(value);
    });
  };

  const handleRemoveQuestion = (idx: number) => {
    setSurveyForm((draft) => {
      draft.questions.splice(idx, 1);
    });
  };

  return {
    surveyForm,
    handleChange,
    handleSelectAndDeselectTag,
    handleToggleIsDraft,
    setSurveyForm,
    handleAddTextTypeQuestion,
    handleAddSelectTypeQuestion,
    handleChangeNumbers,
    questionControl: {
      handleRemoveQuestion,
      handleRemoveChoice,
      handleAddChoice,
      handleChangeQuestion,
      handleChangeNumberOfAnswersAllowed,
      handleToggleIsRequired,
    },
  };
};
