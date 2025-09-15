import { useState } from "react"
import Textarea from "../html/Textarea"
import ModalStyle from "./ModalStyle"
import { generalReportReasons } from "../../data/generalReportReasons"
import Button from "../html/Button"
import useAsync from "../../hooks/useAsync"
import { fetchApi } from "../../utils/fetchApi"



const ReportUserModal = ({username = null, userId = null, onClose = () => {}}) => {
   const [reportForm, setReportForm] = useState({
    generalReason: '', 
    specificReason: ''
   })

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
    console.log(res)
   }, [userId, reportForm])


  return (
    <ModalStyle onClose={onClose} label="Report a Survey">
      <p>
        Please confirm the issue with user{" "}
        <span className="font-semibold text-blue-500">“{username}”</span>.
      </p>

      <div className="grid grid-cols-2  gap-2">
        {generalReportReasons.map((reason) => (
          <button
            value={reason}
            name="generalReason"
            className={` text-sm ${
              reportForm.generalReason === reason
                ? " bg-blue-100 text-blue-400 dark:bg-blue-900/40"
                : "bg-zinc-200 text-neutral-100 dark:bg-zinc-800"
            }  rounded-lg p-2 w-full `}
            onClick={handleChange}
          >
            {reason}
          </button>
        ))}
      </div>
      <div>
        <p className="text-sm">Can you tell us more about the issue about {username}?</p>
        <Textarea
          placeholder="e.g., This user uses offensive language targeting a group of people."
          className="dark:bg-zinc-800 bg-zinc-200 rounded-lg"
          onChange={handleChange}
          name="specificReason"
          value={reportForm.specificReason}
        />
      </div>
      {isSuccess ? <p className="text-xs text-blue-400">
          Successfully reported!
      </p> : error && <p className="text-xs text-red-400">
        {error}
        </p>}
      <Button onClick={handleReport} loadingState = {isLoading} disabled = {isLoading}>Report</Button>
    </ModalStyle>
  );
}

export default ReportUserModal