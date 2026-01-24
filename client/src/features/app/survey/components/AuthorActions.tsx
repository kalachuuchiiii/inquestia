import ReportSurveyModal from "@/components/modals/ReportSurveyModal";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSurveyActions } from "@/hooks/useSurveyActions";
import type { SurveyDTO } from "@shared/types";
import { useQueryClient } from "@tanstack/react-query";
import { Flag, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

export const AuthorActions = () => {
  const { surveyId = "" } = useParams();
  const {
    deleteSurvey,
    closeSurvey,
    isClosingSurvey,
    reOpenSurvey,
    isReOpeningSurvey,
  } = useSurveyActions();
  const queryClient = useQueryClient();
  const survey = queryClient.getQueryData<SurveyDTO>(["survey", surveyId]);

  return (
    <>
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this survey?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can still recover this later
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              disabled={!surveyId}
              onClick={() => deleteSurvey(surveyId)}
              variant="destructive"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
        <AlertDialogTrigger>
          <Tooltip>
            <TooltipContent>Delete survey</TooltipContent>
            <TooltipTrigger>
              <Trash2 />
            </TooltipTrigger>
          </Tooltip>
        </AlertDialogTrigger>
      </AlertDialog>
      {!survey?.isClosed ? (
        <AlertDialog>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to close this survey?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Closing this survey will not delete any of its responses or
                data. only its availability to respondents.
              </AlertDialogDescription>
              <AlertDialogDescription>
                You can still re-open this survey.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                disabled={isClosingSurvey}
                onClick={() => closeSurvey(surveyId)}
                variant={"destructive"}
              >
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
          <AlertDialogTrigger>
            <Button variant="destructive">Close Survey</Button>
          </AlertDialogTrigger>
        </AlertDialog>
      ) : (
        <AlertDialog>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Re-open this survey?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                disabled={isReOpeningSurvey}
                onClick={() => reOpenSurvey(surveyId)}
                className="inquestia-button"
                variant={"outline"}
              >
                Re-open
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
          <AlertDialogTrigger>
            <Button className="inquestia-button">Re-open Survey</Button>
          </AlertDialogTrigger>
        </AlertDialog>
      )}
    </>
  );
};
