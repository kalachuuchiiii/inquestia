import React, { useState } from "react";
import ModalStyle from "./ModalStyle";
import useAsync from "../../hooks/useAsync";
import { fetchApi } from "../../utils/fetchApi";
import Button from "../html/Button";

const BanUserModal = ({
  onClose = () => {},
  username = null,
  userId = null,
  reportId,
}) => {
  const [banDuration, setBanDuration] = useState(1000 * 60 * 60 * 24);

  const [banUser, { isLoading, error, isSuccess }] = useAsync(async () => {
    const res = await fetchApi("patch", `/admin/ban/${userId}`, {
      banDuration,
      reportId,
    });
    console.log(res);
  }, [userId, banDuration, reportId]);

  const banDurations = [
    { days: 1, ms: 1 * 24 * 60 * 60 * 1000 },
    { days: 3, ms: 3 * 24 * 60 * 60 * 1000 },
    { days: 7, ms: 7 * 24 * 60 * 60 * 1000 },
  ];

  return (
    <ModalStyle onClose={onClose} label={`Ban ${username}`}>
      <div className="space-y-4">
        {/* Description */}
        <p className="text-base text-zinc-700 dark:text-zinc-200">
          Please confirm the ban duration for user{" "}
          <span className="font-semibold text-blue-500">“{username}”</span>.
        </p>

        {/* Ban duration options */}
        <div className="grid grid-cols-3 gap-3">
          {banDurations.map(({ days, ms }) => (
            <button
              key={days}
              onClick={() => setBanDuration(ms)}
              type="button"
              className={`text-sm font-medium transition-all border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 py-2 rounded-xl w-full shadow-sm
                ${
                  banDuration === ms
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500 dark:from-blue-700 dark:to-cyan-700"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-700"
                }`}
            >
              {days} day{days > 1 ? "s" : ""}
            </button>
          ))}
        </div>

        {/* Manual duration input */}
        <div className="space-y-2">
          <label
            htmlFor="banDuration"
            className="text-sm text-zinc-600 dark:text-zinc-300"
          >
            Custom Duration (in milliseconds)
          </label>
          <input
            id="banDuration"
            type="number"
            className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={banDuration}
            onChange={(e) => setBanDuration(Number(e.target.value))}
            required
          />
        </div>

        {/* Success message */}
        {isSuccess && (
          <p className="text-xs text-blue-500 font-semibold">
            User banned successfully!
          </p>
        )}

        {/* Submit button */}
        <Button
          onClick={banUser}
          loadingState={isLoading}
          disabled={isLoading}
          className="w-full  mx-auto px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow hover:from-blue-700 hover:to-cyan-600 transition text-base"
        >
          Ban User
        </Button>
      </div>
    </ModalStyle>
  );
};

export default BanUserModal;
