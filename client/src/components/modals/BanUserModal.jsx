

import React, { useState } from 'react'
import ModalStyle from './ModalStyle'
import useAsync from '../../hooks/useAsync'
import { fetchApi } from '../../utils/fetchApi'
import Button from '../html/Button'

const BanUserModal = ({onClose = () => {}, username = null, userId = null, reportId}) => {
  const [banDuration, setBanDuration] = useState(1000 * 60 * 60 * 24);

  const [banUser, { isLoading, error, isSuccess  }] = useAsync(async () => {
   const res = await fetchApi('patch', `/admin/ban/${userId}`, {
    banDuration,
    reportId
   });
   console.log(res)
  })

  const banDurations = [
  {
    days: 1,
    ms: 1 * 24 * 60 * 60 * 1000, // 1 day
  },
  {
    days: 3,
    ms: 3 * 24 * 60 * 60 * 1000, // 3 days
  },
  {
    days: 7,
    ms: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
];


  return (
    <ModalStyle onClose={onClose} label={`Ban ${username}`}>
      <div className="flex flex-col gap-2">
        <label className="text-xs" htmlFor="banDuration">
          Ban Duration(ms)
        </label>
        <input
          className="p-2 outline-none rounded-lg dark:bg-zinc-800"
          onChange={(e) => setBanDuration(e.target.value)}
          value={banDuration}
          type="number"
          required
        />
      </div>
      <div className="flex gap-2 flex-col">
        {banDurations.map(({ days, ms }) => (
          <button
            onClick={() => setBanDuration(ms)}
            className={`${ms === banDuration && ' backdrop-brightness-150' } outline-1 dark:outline-neutral-100/20 rounded-lg p-1`}
          >
            {days} day(s)
          </button>
        ))}
      </div>
      {isSuccess && (
        <p className="text-xs text-blue-600">Banned successfully</p>
      ) }
      <Button onClick={banUser} disabled={isLoading} loadingState={isLoading}>
        Ban
      </Button>
    </ModalStyle>
  );
}

export default BanUserModal