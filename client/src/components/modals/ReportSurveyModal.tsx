import { useState, type ChangeEvent } from "react";
import ModalStyle from "./ModalStyle";

import { GENERAL_REASONS } from "@shared/constants";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/axios.instance";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { _capitalize } from "chart.js/helpers";
import { useParams } from "react-router-dom";

const ReportSurveyModal = ({ surveyTitle }: { surveyTitle: string }) => {
  const { id: surveyId } = useParams();
  const [reportForm, setReportForm] = useState({
    generalReason: "",
    specificReason: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReportForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectGeneralReason = (
    reason: (typeof GENERAL_REASONS)[number]
  ) => {
    setReportForm((prev) => ({
      ...prev,
      generalReason: reason,
    }));
  };

  const { mutate: handleReport, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const p = API.post(`/api/survey/report-survey/${surveyId}`, {
        reportForm,
      });
      await toast.promise(p, {
        loading: "Reporting Survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      const res = await p;
      return res;
    },
  });

  return (
    <DialogContent className="p-4">
      <div className="space-y-4">
        <DialogHeader className="text-base text-zinc-700 dark:text-zinc-200">
          <DialogTitle>Please confirm the issue with the survey </DialogTitle>
          <DialogDescription className="font-semibold text-blue-500">
            “{surveyTitle}”
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 text-xs sm:grid-cols-3 gap-3">
          {GENERAL_REASONS.map((reason) => (
            <button
              key={reason}
              value={reason}
              name="generalReason"
              className={` font-medium text-xs transition-all border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 py-2 rounded-xl w-full shadow-sm
                ${
                  reportForm.generalReason === reason
                    ? "bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 text-white border-blue-500 dark:from-blue-700 dark:to-cyan-700"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-700"
                }`}
              onClick={() => handleSelectGeneralReason(reason)}
              type="button"
            >
              {_capitalize(reason.replaceAll("_", " "))}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Can you tell us more about the issue with{" "}
            <span className="font-semibold text-blue-500">{surveyTitle}</span>?
          </p>
          <Textarea
            placeholder="e.g., This survey contains offensive or misleading content."
            className="dark:bg-zinc-800 bg-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[80px] resize-y"
            onChange={handleChange}
            name="specificReason"
            value={reportForm.specificReason}
          />
        </div>

        <Button
          onClick={() => handleReport()}
          disabled={
            isLoading ||
            !reportForm.generalReason ||
            !reportForm.specificReason.trim()
          }
        >
          Report
        </Button>
      </div>
    </DialogContent>
  );
};

export default ReportSurveyModal;
