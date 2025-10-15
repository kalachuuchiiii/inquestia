



import React, { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import useAsync from '../../hooks/useAsync';
import useSwal from '../../hooks/useSwal';
import TransactionCard from '../../components/card/TransactionCard';
import Button from '../../components/html/Button';
import { FaCheck } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

const statusOptions = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'fulfilled', label: 'Fulfilled' },
  { value: 'rejected', label: 'Rejected' },
];

const TransactionRequests = () => {
  const [status, setStatus] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [selectedTransac, setSelectedTransac] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);
  const swal = useSwal();

  const [fetchTransactions, { isLoading: loading ,error }] = useAsync(async() => {
     const url = `/transaction/list/admin${status ? `?status=${status}` : ''}`;
      const res = await fetchApi('get', url);
      if (res.success) {
        setTransactions(res.transactions || []);
      }
  })

  useEffect(() => {
    fetchTransactions();

  }, [status]);


  const handleFulfill = async (transacId) => {
    if (!proofFile) {
      swal({
        icon: 'warning',
        title: 'Photo proof required',
        text: 'Please upload a photo proof to fulfill this transaction.'
      });
      return;
    }
    swal({
      icon: 'question',
      title: 'Fulfill Transaction',
      text: 'Are you sure you want to fulfill this transaction? This action cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Yes, fulfill',
      cancelButtonText: 'Cancel',
    }, async () => {
      setActionLoading(true);
      setActionError(null);
      try {
        const formData = new FormData();
        formData.append('proof', proofFile);
        const res = await fetchApi('patch', `/transaction/fulfill/${transacId}`, formData);
        if (res.success) {
          setSelectedTransac(null);
          setProofFile(null);
          fetchTransactions();
          swal({
            icon: 'success',
            title: 'Transaction Fulfilled',
            text: 'The transaction has been fulfilled successfully.'
          });
        } 
      } catch (err) {
        setActionError(err.response.data.message || 'Error fulfilling transaction');
        swal({
          icon: 'error',
          title: 'Error',
          text: err.response.data.message || 'Error fulfilling transaction.'
        });
      }
      setActionLoading(false);
    });
  };



  const handleReject = async (transacId) => {
    swal({
      icon: 'warning',
      title: 'Reject Transaction',
      text: 'Are you sure you want to reject this transaction? This action cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
      cancelButtonText: 'Cancel',
    }, async () => {
      setActionLoading(true);
      setActionError(null);
      try {
        const res = await fetchApi('patch', `/transaction/reject/${transacId}`, {}, { credentials: true });
        if (res.success) {
          fetchTransactions();
          swal({
            icon: 'success',
            title: 'Transaction fulfilled',
            text: 'The transaction has been fulfilled.'
          });
        } 
      } catch (err) {
        console.log(err)
        setActionError(err.response.data.message || 'Error rejecting transaction');
        swal({
          icon: 'error',
          title: 'Error',
          text: err.response.data.message || 'Error rejecting transaction.'
        });
      }
      setActionLoading(false);
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction Requests</h2>
      <div className="mb-4 flex items-center gap-2">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            className={`px-4 py-1 rounded-full text-sm font-medium transition border ${
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
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((transac) => (
              <div className="flex gap-2">
                <TransactionCard tx={transac} />
                {transac.status === "pending" && (
                  <div className="flex text-sm items-center">
                    <button
                      className="py-1 px-5 flex gap-2 items-center hover:backdrop-brightness-75 transition-color duration-200 rounded-xl"
                      onClick={() => handleReject(transac._id)}
                      disabled={actionLoading}
                    >
                      <AiOutlineClose className="text-red-500" />
                      Reject
                    </button>
                    <button
                      className="py-2 px-5 flex gap-2 items-center rounded-xl hover:backdrop-brightness-75 transition-color duration-200"
                      onClick={() => setSelectedTransac(transac._id)}
                      disabled={actionLoading}
                    >
                      <FaCheck className="text-blue-500" /> Fulfill
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Fulfill Modal */}
      {selectedTransac && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-blue-200 dark:border-zinc-700 animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 text-xl transition"
              onClick={() => { setSelectedTransac(null); setProofFile(null); }}
              aria-label="Close"
            >
              <AiOutlineClose />
            </button>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mb-2">
                <FaCheck className="text-blue-600 dark:text-blue-400 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-center">Fulfill Transaction</h3>
              <p className="mb-3 text-center text-zinc-600 dark:text-zinc-300 text-sm">
                Please upload a <span className="font-semibold text-blue-600">photo proof</span> to fulfill this transaction.<br/>
                Only image files are accepted.
              </p>
              <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-50 dark:bg-zinc-800 text-blue-600 rounded-lg shadow-md tracking-wide uppercase border border-blue-200 dark:border-zinc-700 cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700 transition mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m5 4v8m0 0l4-4m-4 4l-4-4" /></svg>
                <span className="mt-2 text-base leading-normal">{proofFile ? proofFile.name : 'Select a file'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setProofFile(e.target.files[0])}
                />
              </label>
              <div className="flex gap-3 w-full mt-2">
                <button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-cyan-600 transition disabled:opacity-50"
                  onClick={() => handleFulfill(selectedTransac)}
                  disabled={actionLoading || !proofFile}
                >
                  {actionLoading ? 'Processing...' : 'Submit'}
                </button>
                <button
                  className="flex-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 px-4 py-2 rounded-lg font-semibold shadow hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
                  onClick={() => { setSelectedTransac(null); setProofFile(null); }}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionRequests;