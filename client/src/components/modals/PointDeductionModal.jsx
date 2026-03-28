import React, { useState } from 'react'
import useAsync from '../../hooks/useAsync';
import ModalStyle from './ModalStyle';
import Button from '../html/Button';
import { fetchApi } from '../../utils/fetchApi';
import useSwal from '../../hooks/useSwal';

const PointDeductionModal = ({onClose = () => {}, userPoint = null, userId = null, reportId = null, username = null}) => {
    const [pointsToDeduct, setPointsToDeduct] = useState(0);
    const swal = useSwal();

  const [deductUsersPoints, { isLoading, error, isSuccess }] = useAsync(
    async () => {
      const res = await fetchApi("patch", `/admin/deduct/${userId}/`, {
       reportId, 
       pointsToDeduct
      });
      if(res?.success){
           swal({
            title: 'Deducted successfully!', 
            icon: 'success',

           }, () => {
            onClose();
           })
      }
    }
  );

  return (
    <ModalStyle label={`Deduct ${username}'s points`} onClose={onClose}>
      <main className='space-y-6'>
        <div>
          <label className="text-xs" htmlFor="userpoints">
            {username}'s points:{" "}
          </label>
          <p id="userpoints"> {userPoint}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">Deduct by</p>

          <input
            value={pointsToDeduct}
            className="p-2 rounded-lg outline-none dark:bg-zinc-800"
            onChange={(e) => setPointsToDeduct(e.target.value)}
            type="number"
          />
        </div>
          <div className="flex flex-col gap-2">
          <p className="text-xs">To be</p>
          <p>{userPoint - pointsToDeduct}</p>
        </div>
        <Button className='inquestia-button mx-auto' onClick = {deductUsersPoints} disabled = {isLoading} loadingState={isLoading}>Deduct</Button>
      </main>
    </ModalStyle>
  );
}

export default PointDeductionModal