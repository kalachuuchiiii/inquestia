import { useInView } from "react-intersection-observer";
import useAsync from "../../hooks/useAsync";
import { fetchApi } from "../../utils/fetchApi";
import { useEffect, useState } from "react";
import ReportedCard from "./ReportedCard";
import UserProfileCard from "../../components/card/UserProfileCard";

const ResolvedSurveyReports = () => {
  const { ref, inView } = useInView();
  const [resolvedReportedSurveys, setResolvedReportedSurveys] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [totalResolvedReportedSurveys, setTotalResolvedReportedSurveys] = useState(0);

  const [getResolvedReportedSurveys, { isLoading }] = useAsync(
    async ({ page = 1, overwrite = true } = {}) => {
      if (page === null) return;
      const res = await fetchApi("get", `/admin/resolved/survey-reports`, {
        page,
      });
      console.log(res)
      setResolvedReportedSurveys((prev) =>
        overwrite ? res.documents : [...prev, ...res.documents]
      );
      setNextPage(res.nextPage);
      setTotalResolvedReportedSurveys(res.totalReports);
    }
  );

  useEffect(() => {
    getResolvedReportedSurveys();
  }, []);

  useEffect(() => {
    if (inView && nextPage && !isLoading) {
      getResolvedReportedSurveys({ page: nextPage, overwrite: false });
    }
  }, [inView]);

  return (
    <div className="p-6 w-full  mx-auto  min-h-screen">
      <div className="mb-6 w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Resolved Reported Surveys
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total: {totalResolvedReportedSurveys}
        </span>
      </div>

      <div className="grid gap-2 w-full sm:grid-cols-2 ">
        {resolvedReportedSurveys.length > 0 ? (
          resolvedReportedSurveys.map((report) => (
            <ReportedCard key={report._id} report={report}>
              <div className="flex flex-col gap-2 shrink-0 ">
                <p>Resolved By: <span className="text-gradient">{report.resolveAction}</span></p>
                <ReportedCard.Survey />
              </div>
            </ReportedCard>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No resolved reports yet.
          </p>
        )}
      </div>

      <div ref={ref} className="flex justify-center py-8">
        {isLoading && (
          <span className="text-gray-600 dark:text-gray-400">
            Loading more...
          </span>
        )}
      </div>
    </div>
  );
};

export default ResolvedSurveyReports;
