import { useState } from "react";
import ModalStyle from "./ModalStyle";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { GENERAL_REASONS } from "@shared/constants";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/axios.instance";
import { toast } from "sonner";
import { useReportForm } from "@/hooks/useReportForm";

const ReportUserModal = ({
  username = null,
  userId = null,
  onClose = () => {},
}) => {
  const { reportForm, handleChangeSpecificReason, handleSelectGeneralReason } =
    useReportForm();

  const { mutate: handleReport, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const p = API.post(`/api/user/report-user/${userId}`, {
        reportForm,
      });
      await toast.promise(p, {
        loading: "Reporting user...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
    },
  });

  return (
    <ModalStyle onClose={onClose} label="Report a User">
      <div className="space-y-4">
        <p className="text-base text-zinc-700 dark:text-zinc-200">
          Please confirm the issue with user{" "}
          <span className="font-semibold text-blue-500">“{username}”</span>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {GENERAL_REASONS.map((reason) => (
            <button
              key={reason}
              value={reason}
              className={`text-sm font-medium transition-all border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 py-2 rounded-xl w-full shadow-sm
                ${
                  reportForm.generalReason === reason
                    ? " text-white border-blue-500 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-700"
                }
              `}
              onClick={() => handleSelectGeneralReason(reason)}
              type="button"
            >
              {reason}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Can you tell us more about the issue with{" "}
            <span className="font-semibold text-blue-500">{username}</span>?
          </p>
          <Textarea
            placeholder="e.g., This user uses offensive language targeting a group of people."
            className="dark:bg-zinc-800 bg-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[80px] resize-y"
            onChange={handleChangeSpecificReason}
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
          className="inquestia-button w-full"
        >
          Report
        </Button>
      </div>
    </ModalStyle>
  );
};

export default ReportUserModal;
