import UserIcon from "../UserIcon.jsx";
import { formatIsoString } from "../../utils/formatIsoString.js";
import { capitalize } from "../../utils/capitalize.js";
import ArrowButton from "../html/ArrowButton.jsx";

const questionType = {
  select: "Choice-based",
  text: "Open-ended",
};

const AnswerCard = ({
  showRedirect = false,
  answer = {
    user: null,
    survey: null,
    type: "",
    answers: [],
    createdAt: new Date().toISOString(),
  },
}) => {
  const getAns = (question) => {
    if (!question) return null;

    const matched = answer?.answers?.find((a) => a.question === question._id);
    if (!matched) return <p className="italic opacity-50">No answer</p>;

    const { answer: ans } = matched;

    // Open-ended answer
    if (typeof ans === "string") {
      return (
        <div className="p-2 rounded-lg w-full bg-neutral-200 dark:bg-zinc-900 text-zinc-900 dark:text-neutral-100">
          {ans? <p>{ans}</p> : <p className="opacity-50">No answer provided</p>}
        </div>
      );
    }

    // Choice-based answer
    if (Array.isArray(ans)) {
      const normalizedAns = ans.map((a) => a.trim().toLowerCase());
      return (
        <div className="w-full space-y-1">
          {question.choices.map((c, idx) => {
            const isSelected = normalizedAns.includes(c.trim().toLowerCase());
            return (
              <p
                key={idx}
                className={`p-2 rounded transition ${
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

  return (
    <div className="p-6 w-full shadow-xl dark:bg-zinc-900 rounded-xl outline outline-1 outline-neutral-200/20 dark:outline-neutral-800/40 m-2">
      {/* User */}
      <UserIcon className="flex items-center gap-2 text-sm" user={answer.user}>
        <UserIcon.Card size="8" />
        <p className="text-xs opacity-50">
          {formatIsoString(answer.createdAt)}
        </p>
      </UserIcon>

      {/* Answers */}
      <div className="rounded-b-lg space-y-4 dark:bg-zinc-950 p-3 mt-2">
        {answer?.survey?.questions?.length > 0 ? (
          answer.survey.questions.map((q, i) => (
            <div key={q._id || i} className="text-sm space-y-2">
              {/* Question header */}
              <div>
                <p className="text-base font-medium">
                  {i + 1}.) {q.question}
                </p>
                <p className="text-xs opacity-70">
                  {capitalize(questionType[q.type] || "Unknown")}
                </p>
                {q?.multipleChoice && (
                  <span className="text-[11px] font-medium px-2 py-0.5 bg-neutral-200 dark:bg-zinc-800 rounded">
                    Multiple Choice
                  </span>
                )}
              </div>

              {/* Answer */}
              <div className="border-l pl-3">
                <div className="flex flex-col items-start gap-2">
                  {getAns(q)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="italic opacity-50">No questions available</p>
        )}

        {/* Redirect */}
        {showRedirect && (
          <div className="w-full flex justify-end pt-2">
            <ArrowButton to={`/survey/${answer?.survey?._id}`}>
              View Survey
            </ArrowButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerCard;
