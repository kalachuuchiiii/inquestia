import { memo } from 'react';
import SurveyTagList from '../lists/SurveyTagList.jsx';
import { formatIsoString } from '../../utils/formatIsoString.js';
import { useState } from 'react';
import Bar from '../html/Bar.jsx';
import UserIcon from '../UserIcon.jsx';
import useCTX from '../../hooks/useCTX.js';
import { SurveyCardContext } from '../../context/surveyCardContext.js';
import useToggler from '../../hooks/useToggler.js';
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from '../html/Button.jsx';
import SurveyWidget from '../widget/SurveyWidget.jsx';
import { AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { fetchApi } from '../../utils/fetchApi.js';
import useAsync from '../../hooks/useAsync.js';
import { UserSurveyContext } from '../../context/userSurveyContext.js';
import ArrowButton from '../html/ArrowButton.jsx';

const SurveyCard = ({ survey = {}, Context = null, children = null }) => {
  const [isOptionOpen, o, closeOptionWidget, toggle] = useToggler(false);
  const { user = { _id: null } } = useSelector(state => state.user);
  const { modifyFieldById = () => { } } = useCTX(Context);

  const [setIsSurveyClosed, { isLoading, error }] = useAsync(async (bool = false) => {
    const res = await fetchApi("patch", `/survey/${survey?._id}`, {
      closed: bool
    });
    if(!res?.success)return;
      modifyFieldById(prev => ({ ...prev, closed: bool }), survey._id);
      closeOptionWidget();
  })
  
  const props = {
    surveyId: survey?._id, 
    isDraft: survey?.isDraft,
    Context: Context,
    closeSurvey: () => setIsSurveyClosed(true),
    isClosingSurvey: isLoading,
    title: survey?.title, 
    onClose: toggle
  }

  return <div className="grid overflow-hidden place-content-center grid-rows-1 grid-cols-1">
    <AnimatePresence>
      {isOptionOpen && (survey?.isDraft ? <SurveyWidget.Draft {...props} /> : <SurveyWidget {...props}/>)}
    </AnimatePresence>
    <SurveyCardContext.Provider value={{
      ...survey,
      toggle,
      isOptionOpen
    }}>
      <div className="flex row-span-1 col-span-1 row-start-1 col-start-1 rounded-lg overflow-hidden flex-col p-1 bg-zinc-900  gap-1">
        {
          (survey?.closed || survey.hasReachedTargetRespondents) ? <div className="w-full h-full grid grid-rows-1  grid-cols-1  place-content-center">
            <div className="row-span-1 col-span-1 row-start-1 space-y-1 space-x-1 col-start-1">
              {children}
            </div>
            <div onClick={e => e.stopPropagation()} className="row-span-1 col-span-1 flex justify-center flex-col gap-2 items-center bg-zinc-950/90 z-30 row-start-1 z-20 col-start-1">
              <p >{survey.closed ? "Survey has been closed." : "Survey is over."}</p>
              <div className = " text-center mx-auto">
                {(user._id === survey.user._id) && <div className = "flex flex-col justify-center gap-4" >
                  <Button onClick={() => setIsSurveyClosed(false)} className="truncate w-26  text-center bg-neutral-100 rounded-lg px-6 py-2 text-zinc-900" color="black" loadingState={
                  isLoading
                }>Re-open</Button>
                <ArrowButton to = {`/answer/s/${survey._id}`} >View Answers</ArrowButton>
                </div>}
              </div>
            </div>
          </div> : children
        }
      </div>
    </SurveyCardContext.Provider>
  </div>
}


SurveyCard.Preview = () => {
  const { title = null, description = null, questions = [] } = useCTX(SurveyCardContext);

  const firstTwoQuestions = questions.slice(0, 2);

  return (
    <div className="text-sm shrink-1 w-full min-h-30 bg-zinc-950 rounded-lg p-3">
      <div>
        <h1 className="text-xl leading-5 lato truncate">{title}</h1>
        <p className="text-sm truncate opacity-80">{description}</p>
      </div>
      <div className=" py-2 text-xs opacity-80">
        {
          firstTwoQuestions.map((q = {}, i) => <div key = {i}>
            <p>Question {(i + 1)}: {q?.question}</p>
          </div>)
        }
      </div>
    </div>)
}

SurveyCard.Author = () => {
  const { user = null, createdAt = new Date().toISOString(), questions = [] } = useCTX(SurveyCardContext);

  return (
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
  )
}

SurveyCard.Redirect = () => {
  const { _id = null, tags = [] } = useCTX(SurveyCardContext);
  return (
    <div className=" items-center flex justify-between p-2 rounded">
      <div className="text-xs">
        <SurveyTagList tags={tags} />
      </div>
      <ArrowButton className="gap-6 p-2  m-2 text-xs shrink-0 w-fit" to={`/survey/${_id}`}>View Survey</ArrowButton>
    </div>)
}

SurveyCard.Redirect.Draft = () => {
  const { _id = null, tags = [] } = useCTX(SurveyCardContext);
  return (
    <div className=" items-center flex justify-between p-2 rounded">
      <div className="text-xs">
        <SurveyTagList tags={tags} />
      </div>
      <ArrowButton className="gap-6 p-2  m-2 text-xs shrink-0 w-fit" to={`/create/${_id}`}>View Draft</ArrowButton>
    </div>)
}


SurveyCard.Bar = () => {
  const { targetRespondents = 8, totalRespondents = 0 } = useCTX(SurveyCardContext)
  return (
    <div className="bg-gradient-to-t from-zinc-950 to-transparent">

      <div className="p-1">
        <Bar total={totalRespondents} target={targetRespondents} />
      </div>
    </div>)
}

SurveyCard.OptionButton = ({ size = 20 }) => {
  const { toggle = () => { }, isOptionOpen = false } = useCTX(SurveyCardContext);

  return <button onClick={toggle} className="shrink-0 z-20 p-1 text-center" >
    {
      isOptionOpen ? <IoCloseOutline size={size} color="white" /> : <BsThreeDotsVertical size={size} color="white" />
    }
  </button>
}

export default SurveyCard;