import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";
import Button from "../../components/html/Button.jsx";

const UpdatePasswordPage = () => {
  const { timeframe } = useParams();
  const nav = useNavigate();

  const [passForm, setPassForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [updatePassword, { isLoading, error, isSuccess }] = useAsync(
    async (e) => {
      e.preventDefault();
      const { password, confirmPassword } = passForm;

      if (!password || !confirmPassword) {
        throw new Error("Please fill in all fields.");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const res = await fetchApi("patch", "/user/update-password", {
        timeframe,
        password,
      });

      if (res?.success) {
        nav("/login");
      } else {
        throw new Error(res?.message || "Something went wrong.");
      }
    },
    [timeframe, passForm]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-300">
      <form
        onSubmit={updatePassword}
        className="w-11/12 sm:w-8/12 md:w-5/12 lg:w-4/12 xl:w-3/12 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg p-8 flex flex-col gap-5 transition-all duration-300"
      >
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 text-center">
          Update Your Password
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-4">
          Enter your new password below.
        </p>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            New Password
          </label>
          <input
            type="password"
            name="password"
            value={passForm.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full p-2.5 rounded-lg outline-none bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passForm.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            className="w-full p-2.5 rounded-lg outline-none bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button
            loadingState={isLoading}
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold rounded-lg transition shadow"
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
