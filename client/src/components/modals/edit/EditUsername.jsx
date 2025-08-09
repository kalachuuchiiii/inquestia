import { useEffect, useState } from 'react';
import Form from '../../html/Form.jsx';
import ModalStyle from '../ModalStyle.jsx';

const EditUsername = ({onClose = () => {}, previousUsername = ''}) => {
  const [username, setUsername] = useState('');
  
  const handleChange = (e) => {
    setUsername(e.target.value);
  }

return <ModalStyle label = "Update your username" onClose = {onClose}>
  <div className = "space-y-1">
      <input placeholder = {previousUsername} className = "p-2 outline-none rounded-lg bg-zinc-800"/>
  <p className = "opacity-50 text-sm">You can change your username only once every 30 days.</p>
  </div>
  <div className = "my-1">
    <button className = "px-5 py-1 rounded-lg bg-neutral-100 text-zinc-900 ">Save</button>
  </div>
</ModalStyle>
}

export default EditUsername