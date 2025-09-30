import React from 'react';
import { fetchApi } from '../../utils/fetchApi';
import useSwal from '../../hooks/useSwal';
import useAsync from '../../hooks/useAsync';
import { FaBolt } from "react-icons/fa6";

const LOAD_OPTIONS = [10, 20, 50, 100];
const CORES_PER_LOAD = 15000;

const ExchangeCenter = () => {
    const swal = useSwal()

       const [handleExchange, { isLoading, error }] = useAsync((async({boosterAmount = 1}) => {
        const res = await fetchApi("post", "/user/exchange", {
          boosterAmount,
        });
       }));

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
        
    }
 


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
        Exchange Center
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Prepaid Load Exchange */}
        <div className="bg-white justify-between text-center dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-200">
            Prepaid Load Exchange
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
            Exchange your cores for prepaid load. Each ₱1 load costs{" "}
            <span className="font-bold">15,000</span> cores.
          </p>
          <div className="grid grid-cols-2 gap-4 overflow-x-auto">
            {LOAD_OPTIONS.map((amount) => (
              <div
                key={amount}
                className="flex flex-col items-center bg-blue-50 dark:bg-blue-950 rounded-lg p-4 shadow w-32"
              >
                <span className="text-lg font-bold text-blue-700 dark:text-blue-200">
                  ₱{amount}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {CORES_PER_LOAD * amount} cores
                </span>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded transition disabled:opacity-50"
                  disabled={false}
                >
                  Exchange
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white text-center justify-between   dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-200">
            Survey Boost Points
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
            Use your cores to boost your survey's visibility and get more
            responses!
          </p>
          <div className="grid grid-cols-2 overflow-x-auto  gap-4">
            {[1, 3, 5, 10].map((boost) => (
              <div
                key={boost}
                className="flex flex-col items-center bg-green-50 dark:bg-green-950 rounded-lg p-4 shadow w-32"
              >
                <span className="text-lg flex truncate items-center gap-2 font-bold text-green-700 dark:text-green-200">
                  <FaBolt /> {boost} Boost
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {boost * 10000} cores
                </span>
                <button
                  onClick={() => toggleAreYouSureModal(boost)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition disabled:opacity-50"
                  disabled={false}
                >
                  Exchange
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