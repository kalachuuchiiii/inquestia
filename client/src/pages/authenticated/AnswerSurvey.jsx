import UserIcon from "../../components/UserIcon.jsx";
import AnswerQuestionList from "../../components/lists/AnswerQuestionList.jsx";
import { formatIsoString } from "../../utils/formatIsoString.js";
import { AnswerQuestionContext } from "../../context/answerQuestionContext.js";
import useAnswerSurvey from "../../hooks/AnswerSurvey/index.js";
import SurveyTagList from "../../components/lists/SurveyTagList.jsx";
import SubmissionButton from "../../components/html/Button.jsx";

const AnswerSurvey = () => {
  const {
    survey,
    isFetchingPending,
    isFetchingError,
    isFetchingFulfilled,
    questionFields,
    submitAnswer,
    modifyFieldById,
    getFieldById,
    fieldArray,
    isSubmissionError,
    isSubmissionPending,
  } = useAnswerSurvey();

  // Loading state
  if (isFetchingPending) {
    return (
      <p className="h-60 flex justify-center items-center opacity-80">
        Loading survey...
      </p>
    );
  }

  // Error state
  if (isFetchingError || !survey) {
    return (
      <p className="h-60 flex justify-center items-center text-red-400 text-sm">
        Failed to load survey. Please try again later.
      </p>
    );
  }

  return (
    <AnswerQuestionContext.Provider
      value={{ modifyFieldById, fieldArray, getFieldById }}
    >
      <main className="min-h-screen dark:bg-zinc-950">
        {/* Header */}
        <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
          <UserIcon user={survey.user || {}}>
            <UserIcon.Card />
          </UserIcon>
        </div>

        {/* Survey Info */}
        <section className="space-y-4 p-4">
          <h1 className="text-2xl font-semibold">{survey.title}</h1>
          {survey.description && (
            <p className="leading-relaxed text-sm opacity-70">
              {survey.description}
            </p>
          )}
          <div className="text-xs flex gap-3 items-center opacity-70">
            <p>{formatIsoString(survey.createdAt)}</p>
            <div className="h-1 w-1 rounded-full bg-current opacity-50" />
            <p>{survey.questions.length} Question(s)</p>
          </div>
          {survey.tags?.length > 0 && (
            <SurveyTagList tags={survey.tags} className="pt-2" />
          )}
        </section>

        {/* Questions */}
        <section className="p-4">
          {survey.questions.length > 0 ? (
            <AnswerQuestionList questionList={survey.questions} />
          ) : (
            <p className="text-sm text-center opacity-60">
              No questions available for this survey.
            </p>
          )}
        </section>

        {/* Submission */}
        <div className="w-full flex flex-col items-end gap-2 p-4">
          {isSubmissionError && (
            <p className="text-red-400 text-xs">{isSubmissionError}</p>
          )}
          <SubmissionButton
            loadingState={isSubmissionPending}
            disabled={survey.questions.length === 0}
            onClick={submitAnswer}
          >
            Submit Answer
          </SubmissionButton>
        </div>
      </main>
    </AnswerQuestionContext.Provider>
  );
};

export default AnswerSurvey;
