import { UserBadge } from "../../components/UserBadge.js";

import { useAppSelector } from "@/hooks/useAppSelector.js";
import { useSurveyForm } from "@/features/app/survey/hooks/useSurveyForm.js";
import { Switch } from "@/components/ui/switch.js";
import { Textarea } from "@/components/ui/textarea.js";
import {
  InputGroup,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group.js";
import { DESCRIPTION_MSG, TAGS_ENUM, TITLE_MSG } from "@shared/index.js";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item.js";
import { Button } from "@/components/ui/button.js";
import { _capitalize } from "chart.js/helpers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.js";
import { SurveyForm } from "@/features/app/survey/components/SurveyForm.js";

const CreateSurvey = () => {
  const { user } = useAppSelector((state) => state.user);

  const surveyControls = useSurveyForm();

  return <SurveyForm  {...surveyControls}  />
};

export default CreateSurvey;
