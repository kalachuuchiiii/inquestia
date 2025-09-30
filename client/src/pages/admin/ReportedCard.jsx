import React, { useState } from "react";
import { formatIsoString } from "../../utils/formatIsoString";
import SurveyCard from "../../components/card/SurveyCard";
import { ReportCardContext } from "../../context/reportCardContext";
import useCTX from "../../hooks/useCTX";
import UserIcon from "../../components/UserIcon";
import BanUserModal from "../../components/modals/BanUserModal";
import { AnimatePresence } from "framer-motion";
import PointDeductionModal from "../../components/modals/PointDeductionModal";
import TakeDownSurveyModal from "../../components/modals/TakeDownSurveyModal";
import { fetchApi } from "../../utils/fetchApi";
import useAsync from "../../hooks/useAsync";
import useSwal from "../../hooks/useSwal";

const ReportedCard = ({ report, children = null }) => {
  return (
   <ReportCardContext.Provider value = {{ ...report }}>
        <div className="   bg-white overflow-hidden dark:bg-zinc-800 dark:text-neutral-100 rounded-2xl w-full shadow-md p-3 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg dark:text-neutral-100 font-semibold text-gray-800">
          Reported {report.reportedEntity?.entity}
        </h2>
        <span className="text-xs text-gray-500">
          {formatIsoString(report.createdAt)}
        </span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-3">
          <UserIcon user = {report.reportedBy}>
            <UserIcon.Card />
          </UserIcon>
          <p className="text-xs  text-gray-500">Reporter</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm">
          <span className="font-medium opacity-50">General Reason: </span>
          {report.generalReason}
        </p>
        <p className="text-lg">
          <span className="font-medium opacity-50">Specific Reason: </span>
          {report.specificReason}
        </p>
      </div>
      {children}
    </div>
   </ReportCardContext.Provider>
  );
};

ReportedCard.Survey = () => {
    const { reportedEntity: { entityId }, entityOwner } = useCTX(ReportCardContext);

    return (
     <div >
       <SurveyCard survey = {entityId}>
        <SurveyCard.Preview />
        <SurveyCard.Author tempUser = {entityOwner} />
        <SurveyCard.Redirect />
        <SurveyCard.Bar />
      </SurveyCard>
     </div>
    );
}

ReportedCard.BanButton = () => {
    const { entityOwner, _id} = useCTX(ReportCardContext)
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isBanModalOpen && (
          <BanUserModal
            reportId = {_id}
            userId={entityOwner._id}
            username={entityOwner.username}
            onClose={() => setIsBanModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsBanModalOpen(true)}
        className="p-2 w-full rounded backdrop-brightness-125 hover:scale-105 transition-transform duration-200 shadow-md"
      >
        Ban {entityOwner?.username}
      </button>
    </>
  );
}; 

ReportedCard.TakeDownSurveyButton = () => {
     const {
       reportedEntity = { entityId: { _id: null, title: "" } },
     } = useCTX(ReportCardContext);
  
    const [takedownSurvey, { isLoading, error, isSuccess }] = useAsync(
    async () => {
      const res = await fetchApi("delete", `/admin/takedown-survey/${reportedEntity.entityId._id}`);
      console.log(res);
    }
  );
  const swal = useSwal();

  const handleShowModal = () => {
    swal(
      {
        icon: "question",
        title: "Take this survey down?",
        text: `This cannot be undone`,
        confirmButtonColor: "#06b6d4",
        confirmButtonText: "Delete",
      },
      takedownSurvey
    );
  }


    return (
      <>
        <button
          onClick={handleShowModal}
          className="p-2 w-full rounded backdrop-brightness-125 hover:scale-105 transition-transform duration-200 shadow-md"
        >
          Takedown Survey
        </button>
      </>
    );
}


ReportedCard.DeductPointButton = () => {
   const { entityOwner, _id } = useCTX(ReportCardContext)
  const [isPointDeductionModalOpen, setIsPointDeductionModalOpen] =
    useState(false);

    return (
      <>
        <AnimatePresence>
          {isPointDeductionModalOpen && (
            <PointDeductionModal
              onClose={() => setIsPointDeductionModalOpen(false)}
              reportId = {_id}
              userPoint={entityOwner?.core?.current}
              username={entityOwner.username}
              userId={entityOwner._id}
            />
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsPointDeductionModalOpen(true)}
          className="p-2 rounded backdrop-brightness-125 hover:scale-105 transition-transform duration-200 shadow-md"
        >
          Deduct the user's core
        </button>
      </>
    );
}



export default ReportedCard;
