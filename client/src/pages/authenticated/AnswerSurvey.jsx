
import { useEffect } from 'react';
import UserIcon from '../../components/UserIcon.jsx';
import AnswerQuestionList from '../../components/lists/AnswerQuestionList.jsx';
import { formatIsoString } from '../../utils/formatIsoString.js';
import useFieldArray from '../../hooks/useFieldArray.js';
import { AnswerQuestionContext } from '../../context/answerQuestionContext.js';
import useAnswerSurvey from '../../hooks/AnswerSurvey/index.js';
import SurveyTagList from '../../components/lists/SurveyTagList.jsx';
import SubmissionButton from '../../components/html/Button.jsx';

const AnswerSurvey = () => {
  const { getSurveyById, isFetchingPending, isFetchingError, survey, isFetchingFulfilled, questionFields, submitAnswer, modifyFieldById, getFieldById, fieldArray, isSubmissionError, isSubmissionPending } = useAnswerSurvey();
  
  

  
  if (!survey || isFetchingPending || !isFetchingFulfilled) {
    return <p>loading...</p>
  }

  return <AnswerQuestionContext.Provider value = {{
    modifyFieldById, 
    fieldArray,
    getFieldById
  }}>
    <div className="min-h-screen">
    <div className=" space-y-4 w-full h-full bg-zinc-950">
      <div className = "p-2">
              <UserIcon user = {survey?.user || {}}>
        <UserIcon.Card />
      </UserIcon>
      </div>
      <div className=" space-y-4 pb-8 px-3 pt-3">
        <div className="space-y-2">
          <h1 className=" pl-1 text-2xl/4">{survey.title}</h1>
        </div>
        <div>

          <p className="leading-3 px-3 py-1 rounded-lg  opacity-50">{survey.description}</p>
        </div>
      </div>
      <div className="text-sm px-2 ">
        <div className="flex gap-3  items-center text-sm opacity-80">
          <p>{formatIsoString(survey.createdAt)}</p>
          <div className="h-1 w-1 rounded-full bg-white" />
          <p>{survey.questions.length} Question/s</p>
        </div>
        <div className = "opacity-80 p-2  border-l-1 border-l-neutral-1004 text-xs">
                  <SurveyTagList tags = {survey.tags} />
        </div>
      </div>
      <main>
        <AnswerQuestionList  questionList={survey.questions} />
      </main>
    </div>
    <div className = "w-full flex flex-col items-end text-right gap-1 p-2">
      { isSubmissionError && <p className = "text-red-400 text-xs">{isSubmissionError}</p>}
      <SubmissionButton loadingState = {isSubmissionPending} onClick = {submitAnswer} className = "px-6 py-2 bg-neutral-100 w-50 text-zinc-900 rounded-lg active:text-neutral-100 active:bg-zinc-950">Submit Answer</SubmissionButton>
    </div>
  </div>
  </AnswerQuestionContext.Provider>
}

export default AnswerSurvey