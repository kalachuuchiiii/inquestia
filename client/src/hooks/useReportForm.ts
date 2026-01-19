import type { GENERAL_REASONS } from "@shared/constants"
import type { ReportedEntity } from "@shared/types"
import { useState } from "react"

export const useReportForm = () => {
    const [reportForm, setReportForm] = useState<{ 
        generalReason: typeof GENERAL_REASONS[number];
        specificReason: string;
    }>({
        generalReason: 'harassment_or_abuse', 
        specificReason: ''
       })

       
   const handleChangeSpecificReason = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReportForm(prev => ({
        ...prev, 
        specificReason: value
    }))
   }

   const handleSelectGeneralReason = (value: typeof GENERAL_REASONS[number]) => {
    setReportForm((prev) => ({
        ...prev,
        generalReason: value
    }))
   }

   return {
    reportForm,
    handleSelectGeneralReason,
    handleChangeSpecificReason
   }

}