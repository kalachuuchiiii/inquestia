import ModalStyle from '../ModalStyle.jsx';
import { useSelector } from 'react-redux';
import UserIcon from '../../UserIcon.jsx';
import { useEffect, useState } from 'react';
import { GoArrowSwitch } from "react-icons/go";
import useAsync from '../../../hooks/useAsync.js';
import { updateUser } from '../../../state/slice/user.js';
import { useDispatch } from 'react-redux';
import Button from '../../html/Button.jsx';
import axios from 'axios';
import { LuImagePlus } from "react-icons/lu";

const ChangeAvatar = ({ onClose = () => { } }) => {
  const dispatch = useDispatch();
  const { user = { avatar: null } } = useSelector(state => state.user);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file)
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result)
    }
    reader.readAsDataURL(file);
  }

  const [handleSave, { isLoading, error, isSuccess }] = useAsync(async () => {
    if (!avatar) throw new Error("You need to select an avatar.");
    const formData = new FormData();
    formData.append("avatar", avatar);
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/change-avatar`, formData, { withCredentials: true });
  
    if (!res?.data?.success){
      throw new Error("Avatar upload failed.");
    }
    dispatch(updateUser({ user: res.data.user})); 
    onClose();
    return res;
  }, [avatar])

  return <ModalStyle label="Change Avatar" onClose={onClose}>
    <div className="p-2 flex items-center justify-between gap-3 my-7">
      <UserIcon className="flex justify-center items-center gap-3 flex-col" user={user}>
        <UserIcon.Avatar size="40" />
        <p className="opacity-80">Old avatar</p>
      </UserIcon>
      <div>
        <GoArrowSwitch size="40" />
      </div>
      <UserIcon className="flex gap-3 items-center justify-center flex-col" user={{ avatar: preview }}>
        <UserIcon.Avatar size="40" disableZoom/>
        <button className="" onClick={() => document.getElementById("avatar").click()}>
          <input onChange={handleChange} id="avatar" className="hidden " type="file" accept="image/*" />
          <div title='Choose a photo.' className="flex gap-2 underline items-center"><LuImagePlus /> New Avatar</div>
        </button>
      </UserIcon>
    </div>
    {isSuccess &&  <p className="text-xs text-blue-400">Avatar successfully updated!</p>}
    <div className="space-y-1">
      <Button onClick={handleSave} loadingState={isLoading} disabled={isLoading}>
        Save
      </Button>
    </div>
  </ModalStyle>
}

export default ChangeAvatar