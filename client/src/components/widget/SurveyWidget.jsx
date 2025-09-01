import AnimationWrapper from '../AnimationWrapper.jsx';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import Button from '../html/Button.jsx';
import DeleteSurveyConfirmationDisplay from '../modals/DeleteSurveyConfirmation.jsx';
import { AnimatePresence } from 'framer-motion';
import ArrowButton from '../html/ArrowButton.jsx';
import { useState } from 'react';
import useToggler from '../../hooks/useToggler.js';
const SurveyWidget = ({ onClose = () => { }, surveyId = null, title = '', closeSurvey = () => { }, isClosingSurvey = false, isDraft = false, Context = null}) => {
  const [isDeleteConfirmationDisplayOpen, o, c, toggle] = useToggler(false);

  const btnStyle = "p-2 text-neutral-100 text-center";

  return <>
    <AnimatePresence>
      {isDeleteConfirmationDisplayOpen && <DeleteSurveyConfirmationDisplay onClose={toggle} Context = {Context} title={title} surveyId={surveyId} />}
    </AnimatePresence>
    <AnimationWrapper className="w-full bg-zinc-700/90 text-zinc-900 dark:bg-zinc-950/90 row-span-1 h-full rounded col-span-1 z-10 row-start-1 col-start-1 flex flex-col justify-end" variants="fromBottom">
      <main onClick={(e) => e.stopPropagation()} className="flex flex-col px-2 py-6 ">
        <div className = "w-full flex justify-center text-neutral-100 items-center">
                      <ArrowButton className = "text-base p-2 gap-2" to = {`/answer/s/${surveyId}`}>View Answers</ArrowButton>
        </div>
            <Button color="white" onClick={closeSurvey} loadingState={isClosingSurvey} className={btnStyle}>Close Survey</Button>
        <button onClick={toggle} className="p-2 text-red-400 h-10 text-center">Delete Survey</button>
      </main>
    </AnimationWrapper>
  </>
}

SurveyWidget.Draft = ({ onClose = () => { }, surveyId = null, title = '', closeSurvey = () => { }, isClosingSurvey = false, isDraft = false, Context = null}) => {
  const [isDeleteConfirmationDisplayOpen, o, c, toggle] = useToggler(false);

  const btnStyle = "p-2 text-neutral-100 text-center";

  return (
    <>
      <AnimatePresence>
        {isDeleteConfirmationDisplayOpen && (
          <DeleteSurveyConfirmationDisplay
            onClose={toggle}
            Context={Context}
            title={title}
            surveyId={surveyId}
          />
        )}
      </AnimatePresence>
      <AnimationWrapper
        className="w-full bg-zinc-950/95 row-span-1 h-full rounded col-span-1 z-10 row-start-1 col-start-1 flex flex-col justify-end"
        variants="fromBottom"
      >
        <main
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col px-2 py-6 "
        >
          <button
            onClick={toggle}
            className="p-2 text-red-400 h-10 text-center"
          >
            Delete Draft
          </button>
        </main>
      </AnimationWrapper>
    </>
  );
}


export default SurveyWidget