

import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const TransactionCard = ({ tx = { }}) => {
    const { mode } = useSelector(state => state.theme)
    const { user } = useSelector(state => state.user);

    const isUsersTransaction = tx?.candidate?._id === user?._id;
    
    

  return (
    <div
      key={tx._id}
      className={`rounded-xl p-4 flex  w-full md:flex-row md:items-center justify-between gap-2 border shadow-sm ${
        mode === "Dark"
          ? "bg-zinc-800 border-zinc-700"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex-1 flex flex-col gap-1">
        <span className="font-semibold">₱{tx?.amount}</span>
        <span className="text-xs opacity-70">Mobile: {tx?.phoneNumber}</span>
        <div className='flex items-center gap-2'>
          <NavLink to = {isUsersTransaction ? '/profile' : `/users/${tx?.candidate?.username}`} className='text-xs hover:underline opacity-50 font-medium'>{tx?.candidate?.username}</NavLink>
          <NavLink 
          to = {`/transaction/${tx?._id}`}
          className={`text-xs font-medium ${
            tx?.status === "pending"
              ? "text-yellow-500"
              : tx.status === "fulfilled"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {tx?.status.charAt(0).toUpperCase() + tx?.status.slice(1)}
        </NavLink>
        </div>
      </div>

    </div>
  );
}

export default TransactionCard