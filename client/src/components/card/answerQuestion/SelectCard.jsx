
import useCTX from '../../../hooks/useCTX.js';
import { AnswerQuestionContext } from '../../../context/answerQuestionContext.js';

const SelectCard = ({question = {}, index = 1}) => {
const {  choices, multipleChoice, _id } = question;
const { modifyFieldById, getFieldById } = useCTX(AnswerQuestionContext); 

const handleClick = (choice) => {
  modifyFieldById((prev) => {
    if(prev.answer.includes(choice)){
      const newAnswer = prev?.answer.filter(a => a !== choice);
       return {
      ...prev, 
      answer: newAnswer
     }
    }
    const newAnswer = prev.multipleChoice && multipleChoice ? [...prev?.answer, choice] : [choice];
    return {
      ...prev, 
      answer: newAnswer
    }
  }, _id)
}

return (
  <div className="px-3 py-6 w-full">
    <div>
      <div className="flex gap-1 items-start">
        {question.isRequired && <p className="text-xs text-red-400 px-1">*</p>}
        <p className="opacity-50 text-sm">Question {index}:</p>
      </div>
      <h1 className="w-full break-all text-lg">{question.question}</h1>
    </div>
    <div className="my-3 flex flex-col gap-1">
      {multipleChoice && (
        <p className="bg-neutral-100 rounded-lg px-3 py-1 text-xs my-2 text-zinc-900 w-fit">
          Multiple Choice
        </p>
      )}
      <div className="p-2 w-full ml-auto border-l-1 space-y-1 text-sm border-l-neutral-100">
        {choices.map((c) => (
          <button
            onClick={() => handleClick(c)}
            className={`px-3  text-left ${
              getFieldById(_id)?.answer.includes(c) && "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium"
            } outline outline-neutral-100/30 rounded  w-full  py-2`}
          >
            <p> {c}</p>
          </button>
        ))}
      </div>
    </div>
  </div>
);
}

export default SelectCard