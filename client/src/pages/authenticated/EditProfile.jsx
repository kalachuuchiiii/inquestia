
import Textarea from '../../components/html/Textarea.jsx';
import UserIcon from '../../components/UserIcon.jsx';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { capitalize } from '../../utils/capitalize.js';
import { HiMiniPencil } from "react-icons/hi2";
import { AnimatePresence } from 'framer-motion';
import Button from '../../components/html/Button.jsx';
import EditNickname from '../../components/modals/edit/EditNickname.jsx';
import EditUsername from '../../components/modals/edit/EditUsername.jsx';
import EditBio from '../../components/modals/edit/EditBio.jsx';
import ExternalLinksList from '../../components/lists/ExternalLinksList.jsx';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../state/slice/user.js';
import { HiOutlineChevronRight } from "react-icons/hi2";

const EditProfile = () => {
  const [fieldEditing, setFieldEditing] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const dispatch = useDispatch();
  
  const { user = {
    externalLinks: [],
    username: '',
    nickname: '',
    email: '',
    bio: '',
    avatar: '',
    interests: []
  } } = useSelector(state => state.user);
  
  const [saveExternalLink, {
    isLoading,
    error
  }] = useAsync(async() => {
    console.log('ran');
    const res = await fetchApi("patch", "/user/link", {
      externalLink: externalLink || ''
    })
    if(res?.success && res?.user){
      dispatch(updateUser({ user: res.user }));
      setExternalLink('');
    }
  })


  const handleChange = (e) => {
    const { name } = e.target;
    setFieldEditing(name);
  }
  
  const onClose = () => {
    setFieldEditing('');
  }

  const updateModals = {
    nickname: <EditNickname previousNickname={user.nickname || user.username} onClose={onClose} />,
    username: <EditUsername previousUsername={user.username} onClose={onClose} />,
    bio: <EditBio previousBio = {user.bio} onClose = {onClose} />
  }

  const inputStyle = "outline-none w-full p-2";
  const inputPillowStyle = "rounded-lg overflow-hidden px-2 pt-1 bg-zinc-900 flex items-start ";

  return <>
    <AnimatePresence>
      {
        Object.keys(updateModals).includes(fieldEditing) && updateModals[fieldEditing]
      }
    </AnimatePresence>
    <div className="w-full sm:w-[95%] mx-auto backdrop-brightness-25 rounded-lg p-4">

      <div className="pt-4">

        <UserIcon className="w-full flex justify-center items-center" user={user}>
          <UserIcon.Avatar size="30" />
        </UserIcon>
        <div className="flex justify-center items-center">
          <button name="avatar" onClick={handleChange} className="text-sm pt-3">Change avatar</button>
        </div>

      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs">Nickname</label>
          <div className={inputPillowStyle}>
            <input readOnly placeholder="Nickname" value={user.nickname || user.username} className={inputStyle} />
            <button name="nickname" onClick={handleChange} className="pt-3 pb-4 px-3">
              <div className="pointer-events-none">
                <HiMiniPencil />
              </div>
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs">Username</label>
          <div className={inputPillowStyle}>
            <input readOnly placeholder="Username" value={user.username} className={inputStyle} />
            <button name="username" onClick={handleChange} className="pt-3 pb-4 px-3">
              <div className="pointer-events-none">
                <HiMiniPencil />
              </div>
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs">Bio</label>
          <div className={inputPillowStyle}>
            <Textarea placeholder="No bio yet." readOnly displayLimit={false} value={user.bio} />
            <button name="bio" onClick={handleChange} className="pt-3 pb-4 px-3">
              <div className="pointer-events-none">
                <HiMiniPencil />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs">Email</label>
          <input readOnly value={user.email} className="outline-none w-full p-2 " />
        </div>
        <div>
          <label className="text-xs">Password</label>
          <div className="flex gap-1">
            <input readOnly name="password" value="*********" className="outline-none w-full p-2 " />
            <button className="text-xs truncate shrink-0">Change Password</button>
          </div>
        </div>
        <div className="p-2">
          <a href = "/interests" className="flex items-center justify-between">
            <label>
              Your interests
            </label>
            <div ><HiOutlineChevronRight /></div>
          </a>
          <div className="text-xs grid grid-cols-2 opacity-50">
            {user?.interests?.length > 0 && user.interests.map((interest) => <p>{capitalize(interest)}</p>)}
          </div>
        </div>
      </div>
      <div className="flex border-l-1 border-l-white px-3 py-1 flex-col my-8 gap-4">
        <ExternalLinksList externalLinks = {user.externalLinks} />
        <div className="flex flex-col">
          <input value = {externalLink} onChange = {(e) => setExternalLink(e.target.value)} className="text-sm my-2 p-2 outline-none w-11/12" placeholder="Your external link here..." />
          { error && <p className = "text-xs text-red-400">{error}</p>}
        </div>
        <Button disabled = {externalLink.length < 5 || isLoading} className = {`w-full p-2 bg-neutral-100 flex justify-center items-center h-11 rounded-lg text-zinc-900 ${externalLink.length > 5 ? ' active:bg-zinc-900 active:text-neutral-100 ' : 'opacity-50'}`} loadingState = {isLoading} onClick = {saveExternalLink}>Save Link</Button>
      </div>

    </div>
  </>
}

export default EditProfile