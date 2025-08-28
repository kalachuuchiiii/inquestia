import { useEffect, useState } from 'react';
import Form from '../../html/Form.jsx';
import ModalStyle from '../ModalStyle.jsx';
import useAsync from '../../../hooks/useAsync.js';
import Button from '../../html/Button.jsx';
import { fetchApi } from '../../../utils/fetchApi.js';
import { useDispatch } from 'react-redux';

const EditUsername = ({onClose = () => {}, previousUsername = ''}) => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const [saveUsername, { isLoading, error }] = useAsync(async() => {
    const res = await fetchApi("patch", "/user/username", {
      username
    }); 
    if(res?.success && res?.user){
      dispatch(updateUser({user: res.user}));
      onClose();
    }
  }, [username])
  
  const handleChange = (e) => {
    setUsername(e.target.value);
  }

return <ModalStyle label = "Update your username" onClose = {onClose}>
  <div className = "space-y-1">
      <input onChange = {handleChange} placeholder = {previousUsername} className = "p-2 outline-none rounded-lg bg-zinc-800"/>
  <p className = "opacity-50 text-sm">You can change your username only once every 14 days.</p>
  </div>
  <div className = "my-1 space-y-1">
      { error && <p className = "text-xs text-red-400">{error}</p>}
    <Button onClick = {saveUsername} loadingState = {isLoading} className = "px-5 py-1 rounded-lg bg-neutral-100 text-zinc-900 ">Save</Button>
  </div>
</ModalStyle>
}

export default EditUsername