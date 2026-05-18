import React from "react";
import { useSurveyForm } from "../hooks/useSurveyForm";
import { SurveyForm } from "../components/SurveyForm";
import api from "@/lib/axios.instance";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Survey } from "@inquestia/schemas";
import { Button } from "@/components/ui/button";
import { useSurveyActions } from "../hooks/useSurveyActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { SurveyStatus } from "@inquestia/constants";
import LoadingDisplay from "@/components/ui/LoadingDisplay";

const UpdateDraftPage = () => {
  const surveyForm = useSurveyForm();
  const { surveyId = "" } = useParams();
  const { saveSurvey, isSavingSurvey } = useSurveyActions();

  const { data } = useQuery({
    queryFn: async () => {
      const res = await api.get<{ survey: Survey }>(
        `/api/survey/${surveyId}/draft`
      );
      surveyForm.surveyForm.reset(res.data.survey);
      return res.data.survey;
    },
    queryKey: ["draft", surveyId],
  });

  const handleSaveSurvey = (status: SurveyStatus) => {
    const form = surveyForm.surveyForm.getValues();
    saveSurvey({ ...form, status });
  };

  if (!data) {
    return <LoadingDisplay />;
  }

  return (
    <SurveyForm
      {...surveyForm}
      footer={
        <>
          <Button
            disabled={isSavingSurvey}
            onClick={() => handleSaveSurvey("draft")}
          >
            Save as draft
          </Button>
          <AlertDialog>
            <AlertDialogTrigger disabled={isSavingSurvey}>
              <Button className="inquestia-button">Save</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Save survey</AlertDialogTitle>
                <AlertDialogDescription>
                  If you applied some boosters, you will lose booster points.
                  Are you sure you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <main className="flex items-center justify-end gap-2">
                <AlertDialogCancel>No, cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isSavingSurvey}
                  onClick={() => handleSaveSurvey("published")}
                >
                  Yes, publish
                </AlertDialogAction>
              </main>
            </AlertDialogContent>
          </AlertDialog>
        </>
      }
    />
  );
};

export default UpdateDraftPage;
