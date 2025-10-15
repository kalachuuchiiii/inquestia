import UserIcon from "../UserIcon.jsx";
import { formatIsoString } from "../../utils/formatIsoString.js";
import { capitalize } from "../../utils/capitalize.js";
import ArrowButton from "../html/ArrowButton.jsx";
import { useSelector } from "react-redux";
import { IoSparklesSharp } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { PiCertificateBold } from "react-icons/pi";
import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";
import { useState } from "react";
import useSwal from "../../hooks/useSwal.js";

const questionType = {
  select: "Choice-based",
  text: "Open-ended",
};

const getAns = (question, answer) => {
  if (!question) return null;

  const matched = answer?.answers?.find((a) => a.question === question._id);
  if (!matched) return <p className="italic opacity-50">No answer</p>;

  const { answer: ans } = matched;

  if (typeof ans === "string") {
    return (
      <div className="p-2 rounded-lg w-full dark:bg-gray-800 bg-blue-100 text-zinc-900 dark:text-neutral-100">
        {ans ? <p>{ans}</p> : <p className="opacity-50">No answer provided</p>}
      </div>
    );
  }

  if (Array.isArray(ans)) {
    const normalizedAns = ans.map((a) => a.trim().toLowerCase());
    return (
      <div className="w-full space-y-1">
        {question.choices.map((c, idx) => {
          const isSelected = normalizedAns.includes(c.trim().toLowerCase());
          return (
            <p
              key={idx}
              className={`p-2 rounded transition-all ${
                isSelected
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium"
                  : "opacity-70"
              }`}
            >
              {c}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};

const AnswerCard = ({
  showRedirectToSurvey = false,
  showRedirectToAnswer = false,
  showModifyAuthenticityButton = false,
  answer = {
    user: null,
    survey: null,
    type: "",
    answers: [],
    isAuthentic: false,
    _id: null,
    createdAt: new Date().toISOString(),
  },
}) => {
  const { user } = useSelector((state) => state.theme);
  const [isAuthentic, setIsAuthentic] = useState(answer?.isAuthentic);
  const swal = useSwal();

  const [modifyAuthenticity, { isLoading }] = useAsync(async () => {
    const res = await fetchApi(
      "patch",
      `/answer/modify-authenticity/${answer._id}`
    );
    if (res?.success) {
      setIsAuthentic(res?.authenticity);
      swal({
        title: res?.message,
        icon: "success",
      });
    }
  });

  return (
    <div className="relative p-6 w-full shadow-md dark:bg-zinc-900 rounded-lg outline outline-neutral-200/20 dark:outline-neutral-800/40 mb-3 transition-all hover:-translate-y-1 hover:shadow-lg duration-200">
      {/* Authentic Marker */}
      {isAuthentic && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-2 py-1 rounded-full shadow-sm">
          <PiCertificateBold size={14} />
          Authentic
        </div>
      )}

      {/* User Info */}
      <div className="flex items-start gap-3 mb-3">
        <UserIcon user={answer.user}>
          <UserIcon.Card size="10" />
        </UserIcon>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-zinc-800 dark:text-neutral-100">
            {answer?.user?.username || "Anonymous User"}
          </span>
          <span className="text-xs opacity-60">
            {formatIsoString(answer.createdAt)}
          </span>
        </div>
      </div>

      {/* Answers */}
      <div className="space-y-3">
        {answer?.survey?.questions?.length > 0 ? (
          answer.survey.questions.map((q, i) => (
            <div key={q._id || i} className="text-sm space-y-1">
              {/* Question Header */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-start gap-1">
                  <span className="font-semibold mt-1 text-zinc-700 dark:text-zinc-200">
                  {i + 1}.
                </span>
                <span className="font-medium text-base  max-w-[60vw]">
                  <span className="ml-1 mb-2 px-2 py-0.5 rounded bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-300 text-[10px] font-semibold">
                  {capitalize(questionType[q.type] || "Unknown")}
                </span> {q.question}
                </span>
                  </div>
               
                {q?.multipleChoice && (
                  <span className="ml-1 text-[10px] font-medium px-2 py-0.5 bg-neutral-200 dark:bg-zinc-800 rounded">
                    Multi
                  </span>
                )}
              </div>

              {/* Answer */}
              <div className="border-l-2 border-blue-100 dark:border-zinc-700 pl-3 mt-1">
                {getAns(q, answer)}
              </div>
            </div>
          ))
        ) : (
          <p className="italic opacity-50">No questions available</p>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 pt-3">
        {showRedirectToSurvey && (
          <ArrowButton
            className="backdrop-brightness-150 flex rounded items-center gap-2 shadow px-4 py-2"
            to={`/survey/${answer?.survey?._id}`}
          >
            View Survey
          </ArrowButton>
        )}
        {showRedirectToAnswer && (
          <ArrowButton
            className="backdrop-brightness-150 rounded flex items-center gap-2 shadow px-4 py-2"
            to={`/answer/${answer?._id}`}
          >
            View Answer
          </ArrowButton>
        )}
        {showModifyAuthenticityButton && (
          <button
            onClick={modifyAuthenticity}
            disabled={isLoading}
            className={`inquestia-bg px-4 py-2 rounded text-white font-semibold flex items-center gap-2 transition-all duration-200 ${
              isLoading
                ? "opacity-30 cursor-not-allowed"
                : "hover:opacity-80 shadow-md"
            }`}
          >
            {!isAuthentic ? (
              <>
                <IoSparklesSharp /> Mark as authentic
              </>
            ) : (
              <>
                <CgClose /> Revoke authenticity
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AnswerCard;
