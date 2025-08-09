import { useEffect, useState } from 'react';
import Form from '../../html/Form.jsx';
import ModalStyle from '../ModalStyle.jsx';
import Textarea from '../../html/Textarea.jsx';
import { fetchApi } from '../../../utils/fetchApi.js';
import useAsync from '../../../hooks/useAsync.js';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../state/slice/user.js';
import Button from '../../html/Button.jsx';

const EditUsername = ({onClose = () => {}, previousBio = ''}) => {
  const [bio, setBio] = useState(previousBio);
  const dispatch = useDispatch();
  const [saveBio, {
    isLoading, 
    error
  }] = useAsync(async() => {
    if(bio.length > 100){
      throw new Error('Bio can only contain 100 characters.');
    }
    const res = await fetchApi("patch", "/user/bio", {
      bio: bio || ''
    })
    if(res?.success && res?.user){
      dispatch(updateUser({user: res.user}));
      onClose();
    }
  })
  
  const handleChange = (e) => {
    setBio(e.target.value);
  }

return <ModalStyle label = "Update your bio" onClose = {onClose}>
  <div className = "space-y-1">
    <Textarea limit = {100} onChange = {handleChange}  placeholder = "A short description of yourself" className = "rounded-lg bg-zinc-800" value = {bio} displayLimit/>
       {
    error && <p className = "text-xs text-red-400">{error}</p>
  }
  </div>

  <div className = "my-1 w-full flex justify-end">
    <Button onClick = {saveBio} loadingState = {isLoading} >Save</Button>
  </div>
</ModalStyle>
}

export default EditUsername