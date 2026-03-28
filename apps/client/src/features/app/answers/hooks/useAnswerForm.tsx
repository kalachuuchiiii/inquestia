import type { TextInput } from "@/types";
import type { AnswerFormFields } from "@inquestia/types";
import { useImmer } from "use-immer";

export const useAnswerForm = () => {
  const [answerForm, setAnswerForm] = useImmer<AnswerFormFields>({
    surveyId: "",
    responses: [],
    isAnonymous: false
  });

  const handleChangeTextAnswer = (idx: number) => (e: TextInput) => {
    setAnswerForm((draft) => {
      const answer = draft.responses[idx];
      if (answer.type === "select") return;
      answer.answer = e.target.value;
    });
  };

  const handleSelectOrDeselectChoice = (idx: number, choice: string) => {
    setAnswerForm((draft) => {
      const answer = draft.responses[idx];
      if (answer.type === "text") return;
      if(answer.answers.includes(choice)){
        answer.answers = answer.answers.filter((ans) => ans !== choice);
        return;
      }    
      if(answer.answers.length === answer.numberOfAnswersAllowed)return;
      answer.answers.push(choice);
    
    });
  };

    const handleToggleAnonyminity = () => {
    setAnswerForm((draft) => {
      draft.isAnonymous = !draft.isAnonymous;
    })
  }



  return {
    answerForm,
    setAnswerForm,
    answerFormControl: {
      handleChangeTextAnswer,
      handleSelectOrDeselectChoice,
      handleToggleAnonyminity
    },
  };
};
