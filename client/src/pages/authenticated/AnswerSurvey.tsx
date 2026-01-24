import AnswerQuestionList from "../../components/lists/QuestionFormList.js";
import SurveyTagList from "../../components/lists/SurveyTagList.jsx";
import { Button, Button as SubmissionButton } from "../../components/ui/button";
import SurveyCard from "../../components/card/SurveyCard.jsx";
import { QRCodeCanvas } from "qrcode.react";
import { BsDownload } from "react-icons/bs";
import { useRef, useState } from "react";
import { UserBadge } from "@/components/UserBadge.js";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.js";
import SearchUserDialogContent from "../../components/modals/SearchUserDialogContent.js";
import { formatDistanceToNow } from "date-fns";
import useAnswerSurvey from "@/hooks/useAnswerSurvey.js";
import {
  Flag,
  RectangleGoggles,
  RectangleGogglesIcon,
  Trash2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.js";
import ReportSurveyModal from "@/components/modals/ReportSurveyModal.js";
import { TbReport } from "react-icons/tb";
import { useSurveyActions } from "@/hooks/useSurveyActions.js";
import { useParams } from "react-router-dom";
import { AuthorActions } from "@/features/app/survey/components/AuthorActions.js";

const AnswerSurvey = () => {
  const {
    survey,
    submitAnswer,
    isSubmissionPending,
    isFetchingSurveyPending,
    isFetchingSurveyError,
  } = useAnswerSurvey();

  const { user } = useAppSelector((state) => state.user);
  const qrParent = useRef<HTMLDivElement>(null);
  const { deleteSurvey } = useSurveyActions();
  const { surveyId = "" } = useParams();

  const downloadQr = () => {
    if (!qrParent.current) return;
    const canvas = qrParent.current.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = `survey-${survey?._id}-qr.png`;
    a.click();
  };

  if (isFetchingSurveyPending) {
    return (
      <p className="h-60 flex justify-center items-center opacity-80">
        Loading survey...
      </p>
    );
  }

  if (isFetchingSurveyError || !survey) {
    return (
      <p className="h-60 flex justify-center items-center text-red-400 text-sm">
        Failed to load survey. Please try again later.
      </p>
    );
  }

  return (
    <div>
      <main className="min-h-screen ">
        <div className="p-3 border-b overflow-x-auto flex items-center justify-between border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-3 items-center">
            <UserBadge user={survey.author} displayBadge />
          </div>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger>
                <Tooltip>
                  <TooltipContent>Authorized Viewers</TooltipContent>
                  <TooltipTrigger>
                    <RectangleGoggles />
                  </TooltipTrigger>
                </Tooltip>
              </DialogTrigger>
              <SearchUserDialogContent survey={survey} />
            </Dialog>

            <Dialog>
              <ReportSurveyModal />
              <DialogTrigger>
                <Tooltip>
                  <TooltipContent>Report Survey</TooltipContent>
                  <TooltipTrigger>
                    <Flag />
                  </TooltipTrigger>
                </Tooltip>
              </DialogTrigger>
            </Dialog>
            {user._id === survey.author._id && <AuthorActions />}
          </div>
        </div>
        <section className="space-y-4 p-4">
          <div className="flex gap-3 lg:gap-10 justify-between w-full items-start">
            <div>
              <h1 className="text-2xl md:ml-3 font-semibold">{survey.title}</h1>

              <p className="leading-relaxed text-sm opacity-70">
                {survey.description}
              </p>
            </div>
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
          </div>
          <div className="text-xs flex gap-3 items-center opacity-70">
            <p>{formatDistanceToNow(survey.createdAt.toString())}</p>
            <div className="h-1 w-1 rounded-full bg-current opacity-50" />
            <p>{survey.questions.length} Question(s)</p>
          </div>
          <SurveyTagList tags={survey.tags} />
        </section>
        <section className="p-4">
          <AnswerQuestionList questions={survey.questions} />
        </section>
        <div className="w-8/12 mx-auto flex flex-col items-end gap-2 p-4">
          <Button
            disabled={survey.questions.length === 0 || isSubmissionPending}
            onClick={() => submitAnswer()}
            className="inquestia-button mx-auto"
          >
            Submit Answer
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AnswerSurvey;
