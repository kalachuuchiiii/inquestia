import { useSurveyForm } from "@/features/app/survey/hooks/useSurveyForm.js";
import { SurveyForm } from "@/features/app/survey/components/SurveyForm.js";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSurveyActions } from "../hooks/useSurveyActions";
import type { SurveyStatus } from "@inquestia/constants";

const CreateSurveyPage = () => {
  const surveyControls = useSurveyForm();

  const { createSurvey, isCreatingSurvey } = useSurveyActions();

  const handleSubmit = (status: SurveyStatus) => {
    const form = surveyControls.surveyForm.getValues();
    createSurvey({ ...form, status });
  };

  return (
    <SurveyForm
      footer={
        <footer className="flex items-center justify-end gap-2">
          <Button
            onClick={() => handleSubmit("draft")}
            disabled={isCreatingSurvey}
            className="inquestia-button w-30"
          >
            Save as draft
          </Button>

          <Dialog>
            <DialogContent>
              <DialogTitle>Publish Survey?</DialogTitle>
              <DialogDescription>This is not a draft</DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button
                  onClick={() => handleSubmit("published")}
                  disabled={isCreatingSurvey}
                  className="inquestia-button"
                >
                  Publish
                </Button>
              </DialogFooter>
            </DialogContent>
            <DialogTrigger>
              <Button className="inquestia-button w-30">Publish Survey</Button>
            </DialogTrigger>
          </Dialog>
        </footer>
      }
      {...surveyControls}
    />
  );
};

export default CreateSurveyPage;
