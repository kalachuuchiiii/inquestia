

import React, { useState } from 'react'
import useCTX from '../hooks/useCTX';

const ReportButton = ({title, resourceId, onClick = () => {}}) => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    

  return (
    <>
      <AnimatePresence>
        {isReportModalOpen && (
          <ReportSurveyModal
            onClose={() => setIsReportModalOpen(false)}
            surveyTitle={title}
            surveyId={_id}
          />
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsReportModalOpen((prev) => !prev)}
        className="p-2"
      >
        <GoReport size={26} />
      </button>
    </>
  );
}

export default ReportButton