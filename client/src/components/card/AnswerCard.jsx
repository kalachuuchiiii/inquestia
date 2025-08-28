import UserIcon from '../UserIcon.jsx';
import { formatIsoString } from '../../utils/formatIsoString.js';
import { useEffect, useState, useMemo } from 'react';
import ArrowButton from '../html/ArrowButton.jsx';
const AnswerCard = ({ showRedirect = false, answer = {
  user: null,
  survey: null,
  type: ''
} }) => {

  const getAns = (question) => {
    if (!question) throw new Error("");
    const { answer: ans } = answer.answers.find(a => a.question === question._id);

    if (typeof ans === "string") {
      return <p className="p-1">{ans}</p>
    }

    if (!Array.isArray(ans)) return;
    const normalizedAns = ans.map(a => a.trim().toLowerCase());

    return <div className="w-full space-y-2">
      <div className="">
        {question.choices.map((c) => <p className={`${normalizedAns.includes(c.trim().toLowerCase()) && " bg-neutral-50 text-zinc-900 w-full"} px-3 py-1 rounded `}>{c}</p>)}
      </div>
    </div>
  }



  return <div className="p-1 bg-zinc-900 rounded-xl outline-1 outline-neutral-100/50 m-2">
    <UserIcon className="p-2 flex gap-2 text-sm" user={answer.user} >
      <UserIcon.Card size="8" />
      <p className="text-xs opacity-50">{formatIsoString(answer.createdAt)}</p>
    </UserIcon>
    <div className="rounded-b-lg   bg-zinc-950 p-2">

      {
        answer?.survey?.questions?.length > 0 && answer.survey.questions.map((q, i) => <div key={q._id} className="text-sm space-y-3 ">
          <div>
                      <p className="lato text-base" >{i + 1}.) {q.question}</p>
          {q?.multipleChoice && <p className="text-xs px-3 py-1  w-fit">Multiple Choice</p>}
          </div>
          <div className="border-l-1 pb-5  ml-1 pl-2">
            <p className=" overflow-x-auto flex flex-col items-start gap-2 px-2 py-1 opacity-80">{
              getAns(q)
            }</p>
          </div>

        </div>)
      }
      <div className = "w-full flex justify-end p-2">
        { showRedirect && <ArrowButton to = {`/survey/${answer?.survey?._id}`} >View Survey</ArrowButton>}
      </div>
    </div>
  </div>
}

export default AnswerCard