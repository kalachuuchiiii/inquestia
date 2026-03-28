

import React, { useEffect, useState } from "react";
import useAsync from "../../hooks/useAsync";
import { useSelector } from "react-redux";
import { fetchApi } from "../../utils/fetchApi";
import useSwal from "../../hooks/useSwal";
import TransactionCard from "../../components/card/TransactionCard";

const statusOptions = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Fulfilled", value: "fulfilled" },
  { label: "Rejected", value: "rejected" },
];

const Transactions = () => {
  const { user } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.theme);
  const [status, setStatus] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const swal = useSwal();

  const [fetchTransactions, { isLoading }] = useAsync(async({ page = 1, overwrite = true} = {}) => {
      const res = await fetchApi('get', `/transaction/list?status=${status}&page=${page}`);
      if (res?.success) {
        setTransactions(prev => overwrite ? res.transactions : [...prev, ...res.transactions]);
        setNextPage(res.nextPage);
      }
  })

  useEffect(() => {
    fetchTransactions();
  }, [status]);


  const [cancelTransaction, cancelState] = useAsync(async (id) => {
    swal({
        icon: 'warning', 
        title: 'Are you sure?', 
        text: "This cannot be undone!", 
        confirmButtonText: 'Cancel Transaction'
    }, async(result) => {
        if(result.isConfirmed){
            await fetchApi('delete',`/transaction/cancel/${id}`);
        fetchTransactions();
        }
    })
  });

  return (
    <div
      className={` mx-auto p-4 h-[50vh]  w-11/12 rounded-2xl shadow-lg md:w-full my-6 ${
        mode === "Dark"
          ? "bg-zinc-900 text-neutral-100"
          : "bg-white text-zinc-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Your Transactions</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            className={`px-4 py-1 rounded-full h-full  text-sm font-medium transition border ${
              status === opt.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-zinc-700"
            }`}
            onClick={() => setStatus(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {transactions.length === 0 && !isLoading ? (
        <div className="flex justify-center items-center h-32 opacity-70">
          No transactions found.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {transactions.map((tx) => (
            <div className="flex items-center gap-2">
              <TransactionCard tx={tx} />
              {tx.status === "pending" && (
                <button
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                  onClick={() => cancelTransaction(tx._id)}
                  disabled={cancelState.isLoading}
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
     
     <div className="h-20 my-4 text-center w-full">
       {isLoading ? (
        <p>Loading transactions...</p>
      ) : nextPage ? (
        <div >
          <button
            onClick={() =>
              fetchTransactions({ page: nextPage, overwrite: false })
            }
            className="w-full hover:backdrop-brightness-75 transition-all duration-200 p-2 outline-1 outline-black/20 rounded-xl"
          >
            {" "}
            Load more
          </button>
        </div>
      ) : transactions.length > 0 && (
        <p> You've reached the end.</p>
      )}
     </div>
    </div>
  );
};

export default Transactions;