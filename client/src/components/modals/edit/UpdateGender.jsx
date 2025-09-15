import React, { useState } from 'react'
import useAsync from '../../../hooks/useAsync'
import { fetchApi } from '../../../utils/fetchApi'
import ModalStyle from '../ModalStyle'
import GenderOptions from '../../GenderOptions'
import { useSelector } from 'react-redux'
import Notice from '../../html/Notice'
import Button from '../../html/Button'

const UpdateGender = ({onClose}) => {
    const { user } = useSelector(state => state.user)
    const [gender, setGender] = useState(user?.gender)
    const [updateGender, { isLoading, error, isSuccess }] = useAsync(async() => {
        const res = await fetchApi('patch', 
         '/user/update-gender', {
            gender
         }
        )
        console.log(res)
    })


  return (
    <ModalStyle label="Update Gender" onClose={onClose}>
      <div className="space-y-2">
        <Notice>You can only change this setting once every 2 months.</Notice>
        <GenderOptions
          selectedGenders={[gender]}
          onClick={(e) => setGender(e.target.value)}
        />
      </div>
      {isSuccess ? (
        <p className="text-xs text-blue-600">Changed successfully</p>
      ) : (
        error && <p className="text-xs text-red-400">{error}</p>
      )}
      <Button
        onClick={updateGender}
        disabled={isLoading}
        loadingState={isLoading}
      >
        Update
      </Button>
    </ModalStyle>
  );
}

export default UpdateGender