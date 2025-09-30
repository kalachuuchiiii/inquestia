import UserIcon from "../../components/UserIcon.jsx";
import AnswerQuestionList from "../../components/lists/AnswerQuestionList.jsx";
import { formatIsoString } from "../../utils/formatIsoString.js";
import { AnswerQuestionContext } from "../../context/answerQuestionContext.js";
import useAnswerSurvey from "../../hooks/AnswerSurvey/index.js";
import SurveyTagList from "../../components/lists/SurveyTagList.jsx";
import SubmissionButton from "../../components/html/Button.jsx";
import SurveyCard from "../../components/card/SurveyCard.jsx";
import { QRCodeCanvas } from  'qrcode.react';
import { BsDownload } from "react-icons/bs";
import { useRef } from "react";

const AnswerSurvey = () => {
  const {
    survey,
    isFetchingPending,
    isFetchingError,
    submitAnswer,
    modifyFieldById,
    getFieldById,
    fieldArray,
    isSubmissionError,
    isSubmissionPending,
  } = useAnswerSurvey();
  const qrParent = useRef(null)

  const downloadQr = () => {
    const canvas = qrParent.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = pngUrl;
    a.download = `survey-${survey._id}-qr.png`
    a.click();
  }

  if (isFetchingPending) {
    return (
      <p className="h-60 flex justify-center items-center opacity-80">
        Loading survey...
      </p>
    );
  }

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
      <main className="min-h-screen ">
        <div className="p-3 border-b flex items-center justify-between border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-3 items-center">
            <UserIcon user={survey.user || {}}>
             <div>
               <UserIcon.Card /> 
             </div>
            </UserIcon>
          </div>
          <SurveyCard className="" survey={survey}>
            <SurveyCard.Report />
          </SurveyCard>
        </div>
        <section className="space-y-4 p-4">
          <div className="flex gap-3 lg:gap-10 items-center">
            <div
              ref={qrParent}
              className="flex rounded-xl outline outline-white/20 py-2 px-4 flex-col gap-2"
            >
              <QRCodeCanvas
                value={window.location.href}
                size={80}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                includeMargin={false}
              />
              <button
                onClick={downloadQr}
                className="text-xs gap-2 flex items-center"
              >
                {" "}
                <BsDownload /> Download
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{survey.title}</h1>
              {survey.description && (
                <p className="leading-relaxed text-sm opacity-70">
                  {survey.description}
                </p>
              )}
            </div>
          </div>
          <div className="text-xs flex gap-3 items-center opacity-70">
            <p>{formatIsoString(survey.createdAt)}</p>
            <div className="h-1 w-1 rounded-full bg-current opacity-50" />
            <p>{survey.questions.length} Question(s)</p>
          </div>
          {survey.tags?.length > 0 && (
            <SurveyTagList tags={survey.tags} className="pt-2" />
          )}
        </section>
        <section className="p-4">
          {survey.questions.length > 0 ? (
            <AnswerQuestionList questionList={survey.questions} />
          ) : (
            <p className="text-sm text-center opacity-60">
              No questions available for this survey.
            </p>
          )}
        </section>
        <div className="w-8/12 mx-auto flex flex-col items-end gap-2 p-4">
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
