import { useState } from 'react';
import Form from '../../html/Form.jsx';
import ModalStyle from '../ModalStyle.jsx';
import useAsync from '../../../hooks/useAsync.js'
import Button from '../../html/Button.jsx';
import { useSelector } from 'react-redux';
import { fetchApi } from '../../../utils/fetchApi.js';
import { updateUser } from '../../../state/slice/user.js';
import { useDispatch } from 'react-redux';

const EditNickname = ({onClose = () => {}, previousNickname = ''}) => {
  const { user = { _id: null, nickname: ''}} = useSelector(state => state.user)
  const [nickname, setNickname] = useState(previousNickname);
  const dispatch = useDispatch();
  
  const [saveNickname, {
    isLoading, 
    isSuccess, 
    error
  }] = useAsync(async() => {
      if(typeof nickname !== "string"){
        throw new Error("Nickname can only contain letters, numbers, underscores, and dot.");
      }
      if(nickname.length > 26){
        throw new Error("Nickname cannot exceed 18 characters.");
      }
      const res = await fetchApi("patch", "/user/nickname", {
        nickname: nickname.toString() || ''
      });
      console.log(res);
      if(res?.success && res?.user){
        dispatch(updateUser({user: res.user}));
        onClose();
      }
  })
  
  const handleChange = (e) => {
    setNickname(e.target.value);
  }
  

return <ModalStyle label = "Update your nickname" onClose = {onClose}>
  <div className = "space-y-1">
      <input value = {nickname} onChange = {handleChange} placeholder = "Nickname" className = "p-2 w-full outline-none rounded-lg bg-zinc-800"/>
  <p className = "opacity-50 text-sm">A nickname for everyone to identify you as</p>
  {
    error && <p className = "text-xs text-red-400">{error}</p>
  }
  </div>
  <div className = "my-1 w-full flex justify-end">
    <Button loadingState = {isLoading} onClick = {saveNickname}>
      Save
    </Button>
  </div>
</ModalStyle>
}

export default EditNickname