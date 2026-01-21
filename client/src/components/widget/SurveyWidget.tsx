import AnimationWrapper from "../AnimationWrapper.jsx";
import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";
import { Button } from "../ui/button";
import DeleteSurveyConfirmationDisplay from "../modals/DeleteSurveyConfirmation.jsx";
import { AnimatePresence } from "framer-motion";
import ArrowButton from "../html/ArrowButton.jsx";
import { useState } from "react";
import useToggler from "../../hooks/useToggler.js";
import useCTX from "../../hooks/useCTX.js";
import useSwal from "../../hooks/useSwal.js";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const SurveyWidget = ({
  onClose = () => {},
  surveyId = null,
  title = "",
  closeSurvey = () => {},
  isClosingSurvey = false,
  isDraft = false,
  Context = null,
}) => {
  const [isDeleteConfirmationDisplayOpen, o, c, toggle] = useToggler(false);

  const btnStyle = "p-2 text-neutral-100 mx-auto text-center";

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
        className="w-full bg-zinc-700/90 text-zinc-900 dark:bg-zinc-950/90 row-span-1 h-full rounded col-span-1 z-10 row-start-1 col-start-1 flex flex-col justify-end"
        variants="fromBottom"
      >
        <main
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col px-2 py-6 "
        >
          <div className="w-full flex justify-center text-neutral-100 items-center">
            <Link to={`/answer/s/${surveyId}`}>
              <Button variant={"outline"}>
                <p> View Answers</p>
                <ChevronRight />
              </Button>
            </Link>
          </div>
          <Button
            onClick={closeSurvey}
            disabled={isClosingSurvey}
            className={btnStyle}
          >
            {isClosingSurvey ? "Closing..." : "Close Survey"}
          </Button>
          <button
            onClick={toggle}
            className="p-2 text-red-400 h-10 text-center"
          >
            Delete Survey
          </button>
        </main>
      </AnimationWrapper>
    </>
  );
};

SurveyWidget.Draft = ({
  onClose = () => {},
  surveyId = null,
  title = "",
  closeSurvey = () => {},
  isDraft = false,
  Context = null,
}) => {
  const { removeFieldById = () => {} } = useCTX(Context);
  const swal = useSwal();

  const [deleteDraft, { isLoading }] = useAsync(async () => {
    swal(
      {
        title: "Delete draft",
        text: "Are you sure you want to delete this survey draft? This cannot be undone!",
        icon: "warning",
        confirmButtonText: "Delete",
        showCancelButton: true,
      },
      async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetchApi("delete", `/survey/${surveyId}`);
            if (res?.success) {
              removeFieldById(surveyId);
              swal({
                title: "Deleted successfully!",
                icon: "success",
              });
              onClose();
            }
          } catch (error) {
            throw error;
          }
        }
      }
    );
  });

  const btnStyle = "p-2 text-neutral-100 text-center";

  return (
    <>
      <AnimationWrapper
        className="w-full bg-zinc-700/90 text-zinc-900 dark:bg-zinc-950/90 z-10 row-span-1 h-full rounded col-span-1  row-start-1 col-start-1 flex flex-col justify-end"
        variants="fromBottom"
      >
        <main
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col px-2 py-6 "
        >
          <button
            onClick={deleteDraft}
            className="p-2 text-red-400 h-10 text-center"
          >
            Delete Draft
          </button>
        </main>
      </AnimationWrapper>
    </>
  );
};

export default SurveyWidget;
