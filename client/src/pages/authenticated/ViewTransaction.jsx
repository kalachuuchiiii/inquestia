import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchApi } from '../../utils/fetchApi'
import useAsync from '../../hooks/useAsync';

const ViewTransaction = () => {


  const { id } = useParams(); 
  const [transaction, setTransaction] = useState(null);

  const [getTransactionInfo, { isLoading, error }] = useAsync(async() => {
    const res = await fetchApi('get', `/transaction/${id}`);
    if (res.success && res.transaction) {
      setTransaction(res.transaction);
    }
  })

  useEffect(() => {
    getTransactionInfo();
    // eslint-disable-next-line
  }, [id])
   
  return (
    <div className=" mx-auto mt-10 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-zinc-800">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Transaction Details</h2>
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : !transaction ? (
        <div className="text-zinc-500">No transaction found.</div>
      ) : (
  <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Transaction ID:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{transaction._id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Status:</span>
            <span className={`px-2 py-1 rounded text-xs font-bold ${
              transaction.status === 'fulfilled' ? 'bg-green-100 text-green-700' :
              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Amount:</span>
            <span className="text-zinc-600 dark:text-zinc-400">₱{transaction.amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Phone Number:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{transaction.phoneNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">User:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{transaction.candidate?.username || transaction.candidate?._id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Photo Proof:</span>
            {transaction.photoProof ? (
              <a href={transaction.photoProof} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
            ) : (
              <span className="text-zinc-400">None</span>
            )}
          </div>

          {/* Show rejection reasons if pending */}
          {transaction.status === 'rejected' && (
            <div className="mt-6">
              <div className="text-xs text-zinc-500 mb-2 font-medium">Possible reasons for rejection:</div>
              <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1 pl-2">
                <li>Unethical behavior or violation of platform rules</li>
                <li>Spamming or submitting multiple requests in a short period</li>
                <li>Posting nonsensical or irrelevant topics</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ViewTransaction