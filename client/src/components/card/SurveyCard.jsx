import SurveyTagList from '../lists/SurveyTagList.jsx';
import { formatIsoString } from '../../utils/formatIsoString.js';
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
import ArrowButton from '../html/ArrowButton.jsx';
import { GoReport } from 'react-icons/go';
import ReportSurveyModal from '../modals/ReportSurveyModal.jsx';
import { useState } from "react";

const SurveyCard = ({ survey = {}, Context = null, children = null, className = "grid grid-cols-1 grid-rows-1 place-content-center relative dark:bg-zinc-900 bg-neutral-50 rounded-lg shadow-xl overflow-hidden" }) => {
  const [isOptionOpen, o, closeOptionWidget, toggle] = useToggler(false);
  const { user = { _id: null } } = useSelector((state) => state.user);
  const { modifyFieldById = () => {} } = useCTX(Context);

  const [setIsSurveyClosed, { isLoading }] = useAsync(
    async (bool = false) => {
      const res = await fetchApi("patch", `/survey/${survey?._id}`, {
        closed: bool,
      });
      if (!res?.success) return;
      modifyFieldById((prev) => ({ ...prev, closed: bool }), survey._id);
      closeOptionWidget();
    }
  );

  const props = {
    surveyId: survey?._id,
    isDraft: survey?.isDraft,
    Context: Context,
    closeSurvey: () => setIsSurveyClosed(true),
    isClosingSurvey: isLoading,
    title: survey?.title,
    onClose: toggle,
  };

  return (
    <div className={className}>
      <AnimatePresence>
        {isOptionOpen &&
          (survey?.isDraft ? (
            <SurveyWidget.Draft {...props} />
          ) : (
            <SurveyWidget {...props} />
          ))}
      </AnimatePresence>

      <SurveyCardContext.Provider
        value={{
          ...survey,
          toggle,
          isOptionOpen,
        }}
      >
        <div className="flex row-start-1 col-start-1 flex-col gap-2 p-2 relative">
          {children}

          {(survey?.closed || survey.hasReachedTargetRespondents) && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 
                         rounded-md backdrop-blur-sm bg-black/50 text-neutral-100 z-20"
            >
              <p>
                {survey.closed
                  ? "Survey has been closed."
                  : "Survey is over."}
              </p>
              {user._id === survey.user._id && (
                <div className="flex flex-col items-center gap-3">
                  <Button
                    onClick={() => setIsSurveyClosed(false)}
                    className="truncate w-26 text-center bg-neutral-100 rounded-lg px-6 py-2 text-zinc-900"
                    color="black"
                    loadingState={isLoading}
                  >
                    Re-open
                  </Button>
                  <ArrowButton to={`/answer/s/${survey._id}`}>
                    View Answers
                  </ArrowButton>
                </div>
              )}
            </div>
          )}
        </div>
      </SurveyCardContext.Provider>
    </div>
  );
};

SurveyCard.Preview = () => {
  const { title = null, description = null, questions = [] } = useCTX(SurveyCardContext);

  return (
    <div className="text-sm overflow-y-auto scrollbar-none w-full  bg-neutral-100 p-4 dark:bg-zinc-950 rounded-lg">
      <div>
        <h1 className="text-xl leading-5 lato truncate">{title}</h1>
        <p className="text-sm opacity-80 line-clamp-2">{description}</p>
      </div>
      <div className="p-2 text-xs opacity-80">
        {questions.map((q = {}, i) => (
          <p key={i}>
            Question {i + 1}: {q?.question}
          </p>
        ))}
      </div>
    </div>
  );
};

SurveyCard.AgeGroup = () => {
  const { ageGroup = {} } = useCTX(SurveyCardContext);

  const { minAge = 8, maxAge = 120 } = ageGroup;

  return <p className='text-xs py-1 px-6 backdrop-brightness-90 rounded-xl w-fit ' >
    For ages {minAge} to {maxAge}
  </p>
}

SurveyCard.Author = ({ tempUser = null}) => {
  const { user = null, createdAt = new Date().toISOString(), questions = [] } = useCTX(SurveyCardContext);

  return (
    <div className="text-xs p-2 border-t border-gray-200 dark:border-gray-800">
      <UserIcon user={tempUser || user}>
        <UserIcon.Card />
      </UserIcon>
      <div className="opacity-80 flex items-center text-sm gap-2 py-1">
        <p>{formatIsoString(createdAt)}</p>
        <p>•</p>
        <p>{`${questions.length} ${questions.length === 1 ? "question" : "questions"}`}</p>
      </div>
    </div>
  );
};

SurveyCard.Redirect = () => {
  const { _id = null, tags = [] } = useCTX(SurveyCardContext);
  return (
    <div className="flex items-center justify-between p-2 rounded border-t border-gray-200 dark:border-gray-800">
      <div className='text-sm w-full opacity-80'>
        <SurveyTagList tags={tags} />
      </div>
      <ArrowButton className="gap-6 p-2 m-2 text-sm shrink-0 w-fit" to={`/survey/${_id}`}>
        View Survey
      </ArrowButton>
    </div>
  );
};

SurveyCard.Report = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { _id = null, title = null } = useCTX(SurveyCardContext);

  return <>
  <AnimatePresence >
    { isReportModalOpen && <ReportSurveyModal onClose = {() => setIsReportModalOpen(false)} surveyTitle={title} surveyId={_id}/>}
  </AnimatePresence>
  <button onClick = {()=> setIsReportModalOpen(prev => !prev)} className='p-2'>
    <GoReport size = {26} />
  </button>
  </>

}

SurveyCard.Redirect.Draft = () => {
  const { _id = null, tags = [] } = useCTX(SurveyCardContext);
  return (
    <div className="flex items-center justify-between p-2 rounded border-t border-gray-200 dark:border-gray-800">
      <SurveyTagList tags={tags} />
      <ArrowButton className="gap-6 p-2 m-2 text-xs shrink-0 w-fit" to={`/create/${_id}`}>
        View Draft
      </ArrowButton>
    </div>
  );
};

SurveyCard.Bar = () => {
  const { targetRespondents = 8, totalRespondents = 0 } = useCTX(SurveyCardContext);
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 p-2 bg-gradient-to-t from-zinc-50 dark:from-zinc-950">
      <Bar total={totalRespondents} target={targetRespondents} />
    </div>
  );
};

SurveyCard.OptionButton = ({ size = 20 }) => {
  const { toggle = () => {}, isOptionOpen = false } = useCTX(SurveyCardContext);
  const { mode } = useSelector((state) => state.theme);

  return (
    <button
      onClick={toggle}
      className="shrink-0  flex justify-center items-center p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
    >
      {isOptionOpen ? (
        <IoCloseOutline size={size} className=" text-white" />
      ) : (
        <BsThreeDotsVertical
          size={size}
          className={mode === "Dark" ? "text-white" : "text-black"}
        />
      )}
    </button>
  );
};

export default SurveyCard;
