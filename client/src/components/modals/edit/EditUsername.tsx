import { useState } from 'react';
import ModalStyle from '../ModalStyle.jsx';
import useAsync from '../../../hooks/useAsync.js';
import { Button } from '../../ui/button';
import { fetchApi } from '../../../utils/fetchApi.js';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../state/slice/user.js';

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

return (
  <ModalStyle label="Update your username" onClose={onClose}>
    <div className="space-y-1">
      <input
        onChange={handleChange}
        placeholder={previousUsername}
        className="p-2 outline-none rounded-lg w-full bg-neutral-100 dark:bg-zinc-700"
      />
      <p className="opacity-50 text-sm">
        You can change your username only once every 14 days.
      </p>
    </div>
    <div className="my-1 space-y-1">
     
      <Button
        onClick={saveUsername}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </div>
  </ModalStyle>
);
}

export default EditUsername