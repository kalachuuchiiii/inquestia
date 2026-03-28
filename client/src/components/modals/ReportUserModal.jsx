import { useState } from "react"
import Textarea from "../html/Textarea"
import ModalStyle from "./ModalStyle"
import { generalReportReasons } from "../../data/generalReportReasons"
import Button from "../html/Button"
import useAsync from "../../hooks/useAsync"
import { fetchApi } from "../../utils/fetchApi"
import { createPortal } from "react-dom"
import useSwal from "../../hooks/useSwal"



const ReportUserModal = ({username = null, userId = null, onClose = () => {}}) => {
   const [reportForm, setReportForm] = useState({
    generalReason: '', 
    specificReason: ''
   })
   const swal = useSwal();

   const handleChange = (e) => {
    const { name, value } = e.target;
    setReportForm(prev => ({
        ...prev, 
        [name]: value
    }))
   }

   const [handleReport, {isLoading, error, isSuccess}] = useAsync(async() => {
    const res = await fetchApi('post', `/report/user/${userId}`, {
      reportForm
    }); 
    if(res?.success){
       swal(
         {
           title: "Reported successfully!",
           icon: "success",
           text: "Your report is successfully forwarded to the administrators!",
         },
         () => {
           onClose();
         }
       );
    }

   }, [userId, reportForm])


  return (
    <ModalStyle onClose={onClose} label="Report a User">
      <div className="space-y-4">
        <p className="text-base text-zinc-700 dark:text-zinc-200">
          Please confirm the issue with user{' '}
          <span className="font-semibold text-blue-500">“{username}”</span>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {generalReportReasons.map((reason) => (
            <button
              key={reason}
              value={reason}
              name="generalReason"
              className={`text-sm font-medium transition-all border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 py-2 rounded-xl w-full shadow-sm
                ${reportForm.generalReason === reason
                  ? ' text-white border-blue-500 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-700'}
              `}
              onClick={handleChange}
              type="button"
            >
              {reason}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Can you tell us more about the issue with <span className="font-semibold text-blue-500">{username}</span>?
          </p>
          <Textarea
            placeholder="e.g., This user uses offensive language targeting a group of people."
            className="dark:bg-zinc-800 bg-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[80px] resize-y"
            onChange={handleChange}
            name="specificReason"
            value={reportForm.specificReason}
          />
        </div>

        <Button
          onClick={handleReport}
          loadingState={isLoading}
          disabled={isLoading || !reportForm.generalReason || !reportForm.specificReason.trim()}
          className="inquestia-button w-full"
        >
          Report
        </Button>
      </div>
    </ModalStyle>
  );
}

export default ReportUserModal