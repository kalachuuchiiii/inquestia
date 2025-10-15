import React from "react";
import { fetchApi } from "../../utils/fetchApi";
import useSwal from "../../hooks/useSwal";
import useAsync from "../../hooks/useAsync";
import { FaBolt } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { updateUser } from "../../state/slice/user";

const LOAD_OPTIONS = [10, 20, 50, 100];
const CORES_PER_LOAD = 1500;

const ExchangeCenter = () => {
  const swal = useSwal();
  const dispatch = useDispatch();

  const [handleExchange, { isLoading }] = useAsync(async ({ boosterAmount = 1 }) => {
    const res = await fetchApi("post", "/user/exchange", { boosterAmount });
    if (res.success) {
      dispatch(updateUser({ user: res.user }));
      swal({
        title: "Success!",
        icon: "success",
        text: res?.message,
      });
    }
  });

  const [handleCreateTransaction, { isLoading: isCreatingTransaction }] = useAsync(
    async ({ loadAmount = 10, phoneNumber }) => {
      const res = await fetchApi("post", "/transaction", {
        amount: loadAmount,
        phoneNumber,
      });
      if (res?.success) {
        swal({
          icon: "success",
          title: "Success!",
          text: "Your transaction request has been submitted successfully. Your cores will be deducted after it’s fulfilled by the administrator.",
        });
      }
    }
  );

  const promptCreateTransaction = (loadAmount) => {
    swal(
      {
        title: `Enter your mobile number`,
        text: "This is the number that will receive the prepaid load. Please make sure it is correct.",
        input: "text",
        inputPlaceholder: "09XXXXXXXXX or +639XXXXXXXXX",
        showCancelButton: true,
        confirmButtonText: "Exchange",
        cancelButtonText: "Cancel",
        preConfirm: (value) => {
          if (!value || !/^09\d{9}$|^\+639\d{9}$/.test(value)) {
            swal({
              icon: "error",
              title: "Invalid number",
              text: "Please enter a valid PH mobile number.",
            });
            return false;
          }
          return value;
        },
      },
      (result) => {
        if (result.isConfirmed && result.value) {
          handleCreateTransaction({ loadAmount, phoneNumber: result.value });
        }
      }
    );
  };

  const toggleAreYouSureModal = (amount) => {
    swal(
      {
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, exchange it!",
        cancelButtonText: "Cancel",
      },
      async () => handleExchange({ boosterAmount: amount })
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 transition-colors duration-300 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-10 text-center text-blue-700 dark:text-blue-400 tracking-tight">
        Exchange Center
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Prepaid Load Exchange */}
        <div className="bg-white/90 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 rounded-2xl shadow-md p-8 flex flex-col items-center transition hover:shadow-xl hover:-translate-y-1">
          <h2 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400 tracking-wide">
            Prepaid Load Exchange
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center text-sm">
            Exchange your{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-300">cores</span> for prepaid load.
            <br />
            <span className="inline-block mt-1">
              Each ₱1 load costs{" "}
              <span className="font-bold text-blue-700 dark:text-blue-400">{CORES_PER_LOAD.toLocaleString()}</span>{" "}
              cores.
            </span>
          </p>

          <div className="grid grid-cols-2  justify-center gap-4 w-full">
            {LOAD_OPTIONS.map((amount) => (
              <div
                key={amount}
                className="flex flex-col items-center bg-gradient-to-br from-blue-50/60 to-white dark:from-zinc-800 dark:to-zinc-900 border border-blue-100 dark:border-zinc-700 rounded-xl p-5 shadow-sm w-32 hover:shadow-md transition"
              >
                <span className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-1">₱{amount}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  {(CORES_PER_LOAD * amount).toLocaleString()} cores
                </span>
                <button
                  onClick={() => promptCreateTransaction(amount)}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold py-1.5 rounded-lg transition disabled:opacity-50 text-sm shadow"
                  disabled={isCreatingTransaction}
                >
                  {isCreatingTransaction ? "Processing..." : "Exchange"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Survey Boost Points */}
        <div className="bg-white/90 dark:bg-zinc-900 border border-green-100 dark:border-zinc-800 rounded-2xl shadow-md p-8 flex flex-col items-center transition hover:shadow-xl hover:-translate-y-1">
          <h2 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-400 tracking-wide">
            Survey Boost Points
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center text-sm">
            Use your{" "}
            <span className="font-semibold text-green-600 dark:text-green-300">cores</span> to boost your survey’s
            visibility and get more responses!
          </p>

          <div className="grid grid-cols-2 justify-center gap-4 w-full">
            {[1, 3, 5, 10].map((boost) => (
              <div
                key={boost}
                className="flex flex-col items-center bg-gradient-to-br from-green-50/60 to-white dark:from-zinc-800 dark:to-zinc-900 border border-green-100 dark:border-zinc-700 rounded-xl p-5 shadow-sm w-32 hover:shadow-md transition"
              >
                <span className="text-lg flex items-center truncate gap-2 font-bold text-green-700 dark:text-green-300 mb-1">
                  <FaBolt /> {boost} Boost
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  {(boost * 10000).toLocaleString()} cores
                </span> 
                <button
                  onClick={() => toggleAreYouSureModal(boost)}
                  className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 text-white font-semibold py-1.5 rounded-lg transition disabled:opacity-50 text-sm shadow"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Exchange"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCenter;
