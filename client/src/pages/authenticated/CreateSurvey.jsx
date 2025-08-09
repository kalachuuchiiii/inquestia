
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

const CreateSurvey = () => {
  const { user = {
    username: '',
    nickname: '',
    avatar: ''
  } } = useSelector(state => state.user);
  
  const {
  surveyTagline, 
  closeModal,
  addQuestion, 
  isModalOpen, 
  handleChangeTagline,
  selectTag,
  setQuestions,
  questions,
  error,
  isLoading,
  toggleModal, 
  publishSurvey
  } = useCreateSurvey();

  return <>
    <AnimatePresence>
      {
        isModalOpen && <NewQuestionModal onClose={closeModal} addQuestion={addQuestion} />
      }
    </AnimatePresence>
    <div className="min-h-screen p-1">
      <main className=" h-full p-1 space-y-4 rounded-lg">
        <div className="flex gap-2 items-start">
          <UserIcon user={user}>
            <UserIcon.Card>
            </UserIcon.Card>
          </UserIcon>
          <p className="text-xs px-3 py-1 rounded-lg text-zinc-900 bg-neutral-100 ">New Survey</p>
        </div>
        <div className="space-y-1 my-8">
          <div>
            <label className="text-sm">Survey Title</label>
            <Notice>Be mindful of your survey title, stay respectful, and avoid including any sensitive information.
            </Notice>
            <Textarea className = "bg-zinc-800 rounded mt-2" name="title" onChange={handleChangeTagline} value={surveyTagline.title}
              limit={100} rows={1} placeholder="Title of your survey." />
          </div>
          <div>
            <label className="text-sm">Survey Description</label>
            <Notice>
              Make your description clear and concise. Explain what the survey is about, stay respectful, and avoid including any sensitive or personal information.
            </Notice>
            <Textarea className = "bg-zinc-800 rounded mt-2" name="description" onChange={handleChangeTagline} value={surveyTagline.description} placeholder="Description of your survey." />
          </div>
        </div>
        <div>
         <div className="flex items-center gap-2 justify-start">
          <input name="targetRespondents" onChange={handleChangeTagline} value={surveyTagline.targetRespondents} className="w-12 outline-none bg-zinc-800 text-center rounded" type="number" />
          <label className="text-xs">Target Respondents</label>
        </div>
        <p className = "text-sm mb-2 opacity-50">The number of responds your survey aims to get.</p>
        <Notice>Once this survey reached the target respondents, it will no longer be visible in the survey feed.</Notice>
        </div>
        <div className="space-y-4 py-4 px-1 my-10">
          <div>
            <h1 className="lato mb-2">Tags</h1>
            <p className="text-sm">Tags helps you deliver your surveys to your target respondents!</p>
            <Notice >You can only select minimum of 1 tag, and maximum of 5.</Notice>
          </div>
          <div className="text-xs">
            <TagsList select={selectTag} selected={surveyTagline.tags} />
          </div>
        </div>
        <QuestionList setQuestions={setQuestions} questions={questions} />
        { error && <p className = "text-xs text-red-400">{error}</p>}
        <div className="flex flex-col gap-2 my-10" >
          <div className="flex gap-2">
            <button className="w-full p-2 bg-zinc-800 text-neutral-100 rounded-lg">Save as Draft</button>
            <button onClick={toggleModal} className="w-full p-2 bg-neutral-100 text-zinc-900 rounded-lg">Add Question</button>
          </div>
          <div >
            <Button loadingState = {isLoading} onClick = {publishSurvey} className={`w-full p-2 bg-neutral-100 text-zinc-900 rounded-lg text-center`} disabled = {isLoading}>Publish</Button>
          </div>
        </div>
      </main>
    </div>
  </>
}

export default CreateSurvey