import { useInView } from "react-intersection-observer";
import useAsync from "../../hooks/useAsync";
import { fetchApi } from "../../utils/fetchApi";
import { useEffect, useState } from "react";
import ReportedCard from "./ReportedCard";

const ReportedSurveys = () => {
  const { ref, inView } = useInView();
  const [reportedSurveys, setReportedSurveys] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [totalReportedSurveys, setTotalReportedSurveys] = useState(0);

  const [getReportedSurveys, { isLoading }] = useAsync(
    async ({ page = 1, overwrite = true } = {}) => {
      if (page === null) return;
      const res = await fetchApi("get", `/admin/survey-reports`, {
        page,
      });
      setReportedSurveys((prev) =>
        overwrite ? res.documents : [...prev, ...res.documents]
      );
      setNextPage(res.nextPage);
      setTotalReportedSurveys(res.totalReports);
    }
  );

  useEffect(() => {
    getReportedSurveys();
  }, []);

  // Fetch more when in view
  useEffect(() => {
    if (inView && nextPage && !isLoading) {
      getReportedSurveys({ page: nextPage, overwrite: false });
    }
  }, [inView]);

  return (
    <div className="p-6 w-full  mx-auto bg-neutral-100 dark:bg-zinc-950 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Reported Surveys
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total: {totalReportedSurveys}
        </span>
      </div>

      <div className="grid gap-2 w-full sm:grid-cols-2 ">
        {reportedSurveys.length > 0 ? (
          reportedSurveys.map((report) => (
            <ReportedCard key={report._id} report={report}>
              <div className="flex gap-2 shrink-0 ">
                <ReportedCard.Survey />
                <div className="flex flex-col  gap-2 my-2">
                  <ReportedCard.BanButton />
                  <ReportedCard.TakeDownSurveyButton />
                  <ReportedCard.DeductPointButton />
                </div>
              </div>
            </ReportedCard>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No reported surveys yet.
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

export default ReportedSurveys;
