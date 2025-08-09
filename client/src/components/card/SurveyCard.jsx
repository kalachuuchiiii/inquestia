import { memo } from 'react';
import ArrowButton from '../html/ArrowButton.jsx';
import { capitalize } from '../../utils/capitalize.js';
import { formatIsoString } from '../../utils/formatIsoString.js';
import Bar from '../html/Bar.jsx';
import UserIcon from '../UserIcon.jsx';

const SurveyCard = ({ survey = {} }) => {

  const { title = '', description = '', targetRespondents = 3, _id = '', questions = [], tags = [], user = {}, createdAt = '' } = survey;
  console.log(survey.user);

  const firstTwoQuestions = questions.slice(0, 2);

  return <div className="flex rounded-lg overflow-hidden flex-col p-1 bg-zinc-900 gap-1">
    <div className="text-sm bg-zinc-950 rounded-lg p-3">
                  <div>
        <h1 className="text-xl leading-5 lato truncate">{title}</h1>
        <p className="text-sm truncate opacity-80">{description}</p>
      </div>
      <div className=" py-2 text-xs opacity-80">
        {
          firstTwoQuestions.map((q = {}, i) => <div>
            <p>Question {(i + 1)}: {q?.question}</p>
          </div>)
        }
      </div>
    </div>
    <div className="">
      <div className="text-xs p-2">
        <UserIcon user={user}>
          <UserIcon.Card size="6" />
        </UserIcon>
        <div className="opacity-80 items-center flex text-sm gap-2 py-1 ">
          <p> {formatIsoString(createdAt)}</p>
          <p>•</p>
          <p >
            {`${questions.length} ${questions.length === 1 ? 'question' : 'questions'
              }`}</p>
        </div>
      </div>
      <div className = "bg-gradient-to-t from-zinc-950 to-transparent">
              <div className=" items-center flex justify-between p-2 rounded">
        <div className="grid shrink-1 grid-cols-3 pr-2 pl-1 gap-x-1 ">
          {
            tags.map((t) => <p className="col-span-1 text-xs text-left truncate opacity-50">{capitalize(t)}</p>)
          }
        </div>
        <ArrowButton className="gap-6 p-2  m-2 text-xs shrink-0 w-fit" to={`/survey/${_id}`}>View Survey</ArrowButton>
      </div>
      <div className = "p-1">
                            <Bar target = {targetRespondents} />
      </div>
      </div>
    </div>
  </div>
}

export default memo(SurveyCard);