
import UserIcon from '../../components/UserIcon.jsx';
import Textarea from '../../components/html/Textarea.jsx';
import { AnimatePresence } from 'framer-motion';
import QuestionList from '../../components/lists/QuestionList.jsx';
import NewQuestionModal from '../../components/modals/NewQuestion.jsx';
import Notice from '../../components/html/Notice.jsx';
import useCreateSurvey from '../../hooks/useCreateSurvey.js';
import Button from '../../components/html/Button.jsx';

import { useSelector } from 'react-redux';
import TagsList from '../../components/lists/InterestTagList.jsx';
import React from 'react';

const CreateSurvey = () => {
  const { user = {
    username: '',
    nickname: '',
    avatar: null
  } } = useSelector(state => state.user);
  
 const { surveyTagline, 
  closeModal,
  addQuestion, 
  isModalOpen, 
  handleChangeTagline,
  selectTag,
  setQuestions,
  questions,
  error,
  isPublishingPending,
  toggleModal, 
  publishSurvey,
  saveSurveyAsDraft, 
  isSavingAsDraft,
  } = useCreateSurvey();


  return (
    <React.Fragment>
      <AnimatePresence>
        {isModalOpen && (
          <NewQuestionModal onClose={closeModal} addQuestion={addQuestion} />
        )}
      </AnimatePresence>
      <div className="min-h-screen p-1">
        <main className=" h-full p-1 space-y-4 rounded-lg">
          <div className="flex gap-2 items-start">
            <UserIcon user={user}>
              <UserIcon.Card></UserIcon.Card>
            </UserIcon>
            <p className="text-xs px-3 py-1 rounded-lg text-neutral-100 bg-zinc-900 dark:text-zinc-900 dark:bg-neutral-100 ">
              New Survey
            </p>
          </div>
          <div className="space-y-1 my-8">
            <div>
              <label className="text-sm">Survey Title</label>
              <Notice>
                Be mindful of your survey title, stay respectful, and avoid
                including any sensitive information.
              </Notice>
              <Textarea
                className="dark:bg-zinc-700 bg-neutral-200 text-zinc-900 dark:text-neutral-100 rounded mt-2"
                name="title"
                onChange={handleChangeTagline}
                value={surveyTagline.title}
                limit={100}
                rows={1}
                placeholder="Title of your survey."
              />
            </div>
            <div>
              <label className="text-sm">Survey Description</label>
              <Notice>
                Make your description clear and concise. Explain what the survey
                is about, stay respectful, and avoid including any sensitive or
                personal information.
              </Notice>
              <Textarea
                className="dark:bg-zinc-700 bg-neutral-200 text-zinc-900 dark:text-neutral-100 rounded mt-2"
                name="description"
                onChange={handleChangeTagline}
                value={surveyTagline.description}
                placeholder="Description of your survey."
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 justify-start">
              <label className="text-xs">Target Respondents</label>
              <input
                name="targetRespondents"
                onChange={handleChangeTagline}
                value={surveyTagline.targetRespondents}
                className="rounded px-2 py-1 bg-white  w-12 text-center text-zinc-950  focus:outline-none"
                type="number"
              />
            </div>
            <p className="text-sm mb-2 opacity-50">
              The number of responds your survey aims to get.
            </p>
            <Notice>
              Once this survey reached the target respondents, it will no longer
              be visible in the survey feed.
            </Notice>
          </div>
          <div className="my-6  rounded-xl  shadow flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium ">Boost Points:</span>
              <select name = 'booster' onChange={handleChangeTagline} className="rounded px-2 py-1 bg-white   text-zinc-950  focus:outline-none">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs opacity-50 mt-1">
              Boosting your survey pushes it to the homepage more often and
              helps you reach a wider audience faster.
            </p>
          </div>
          <div className="space-y-4 py-4 px-1 my-10">
            <div>
              <h1 className="lato mb-2">Tags</h1>
              <p className="text-sm">
                Tags helps you deliver your surveys to your target respondents!
              </p>
              <Notice>
                You can only select minimum of 1 tag, and maximum of 5.
              </Notice>
            </div>
            <div className="text-xs">
              <TagsList select={selectTag} selected={surveyTagline.tags} />
            </div>
          </div>
          <QuestionList setQuestions={setQuestions} questions={questions} />
        <div className="flex flex-col gap-3 my-10">
  {/* First Row — Add & Save */}
  <div className="flex flex-wrap gap-3">
    {/* Save as Draft (Tertiary) */}
    <Button
      
      loadingState={isSavingAsDraft}
      disabled={isSavingAsDraft || isPublishingPending}
      onClick={saveSurveyAsDraft}
      className="flex-1 bg-white/10 dark:text-white border border-white/20 text-zinc-900  hover:backdrop-brightness-90 hover:border-white/30 rounded-lg px-4 py-2 transition-all shadow-sm hover:shadow-md backdrop-blur-md"
    >
      Save as Draft
    </Button>

    {/* Add Question (Secondary) */}
    <Button
      onClick={toggleModal}
      className="flex-1 bg-gradient-to-r from-indigo-400 via-violet-500 to-fuchsia-500 text-white font-medium rounded-lg px-4 py-2 transition-all shadow-md hover:brightness-110 hover:shadow-lg hover:scale-[1.02]"
    >
      Add Question
    </Button>
  </div>

  {/* Publish (Primary) */}
  <div>
    <Button
      loadingState={isPublishingPending}
      onClick={publishSurvey}
      disabled={isPublishingPending || isSavingAsDraft}
      className="mx-auto w-full sm:w-auto bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 text-white font-semibold rounded-lg px-6 py-3 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:brightness-110 hover:scale-[1.03]"
    >
      Publish
    </Button>
  </div>
</div>

        </main>
      </div>
    </React.Fragment>
  );
}

export default CreateSurvey