import { useEffect, useState } from "react";
import useAsync from "../../hooks/useAsync";
import { fetchApi } from "../../utils/fetchApi";

const RequestAnalyticsTable = () => {
  const [requestAnalytics, setRequestAnalytics] = useState([]);
  const [getRequestAnalytics, { error, isLoading }] = useAsync(async () => {
    const res = await fetchApi("get", "/admin/request-analytics");
    if (!res.success) return;
    setRequestAnalytics(Object.entries(res.requestAnalytics));
  });

  useEffect(() => {
    getRequestAnalytics();
  }, []);

  return (
    <div className="p-6 w-full bg-neutral-100 dark:bg-zinc-950 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          API Usage Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Track how many times each endpoint was hit this week.
        </p>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-zinc-700">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-zinc-800">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  API Endpoint
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  Requests (This Week)
                </th>
              </tr>
            </thead>
            <tbody>
              {requestAnalytics.length > 0 ? (
                requestAnalytics.map(([endpoint, count]) => (
                  <tr
                    key={endpoint}
                    className="border-t border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                  >
                    <td className="py-3 px-4 font-mono text-gray-800 dark:text-gray-100">
                      {endpoint.replace(/^analytics:/, "")}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {count}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    {isLoading
                      ? "Loading analytics..."
                      : "No analytics data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Updated weekly • Powered by Redis logs
      </div>
    </div>
  );
};

export default RequestAnalyticsTable;
