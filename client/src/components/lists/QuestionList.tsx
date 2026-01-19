import TextQuestion from '../card/question/TextQuestion.jsx';
import SelectAnswerQue from '../card/question/SelectAnswerQuestion.jsx';

const QuestionList = ({ questions = [], setQuestions = () => { } }) => {

  const questionPreset = (q = { type: null }, i = 1) => {

    if (q?.type === 'text') {
      return (
        <TextQuestion
          id={i}
        className="p-5 pb-8 rounded outline outline-black/20 dark:bg-zinc-800 dark:outline dark:outline-white/20 dark:text-neutral-100 bg-neutral-200 text-zinc-900"
          question={q}
          setQuestions={setQuestions}
        >
          <div className="flex justify-between">
            <div className="flex gap-1">
              <TextQuestion.RemoveButton />
              <TextQuestion.QuestionNum />
            </div>
            <TextQuestion.RequireCheckbox />
          </div>
          <div className="my-6">
            <TextQuestion.Question />
          </div>
          <div>
            <TextQuestion.AnswerFieldPreview />
          </div>
        </TextQuestion>
      );
    }

    if (q?.type === "select") {
      return (
        <SelectAnswerQue
          id={i}
          className="p-5 pb-8 rounded outline outline-black/20 dark:bg-zinc-800 dark:outline dark:outline-white/20 dark:text-neutral-100 bg-neutral-200 text-zinc-900"
          question={q}
          setQuestions={setQuestions}
        >
          <div className="flex justify-between">
            <div className="flex gap-1">
              <SelectAnswerQue.RemoveButton />
              <SelectAnswerQue.QuestionNum />
            </div>
            <SelectAnswerQue.RequireCheckbox />
          </div>
          <div className="my-6">
            <SelectAnswerQue.Question />
            <SelectAnswerQue.MultipleChoiceButton />
          </div>
          <div>
            <SelectAnswerQue.Choices />
            <SelectAnswerQue.AddOption />
           
          </div>
        </SelectAnswerQue>
      );
    }
  }


  return <div className="space-y-2 ">
    <h1 className="px-2">Survey Questions</h1>
    {
      questions?.length > 0 ? questions.map((q, i) => questionPreset(q, i)) : <p className="text-xs opacity-50 px-2">No questions were added yet.</p>
    }
  </div>
}

export default QuestionList