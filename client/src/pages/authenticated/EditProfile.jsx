import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Textarea from '../../components/html/Textarea.jsx';
import UserIcon from '../../components/UserIcon.jsx';
import { PiShareNetworkThin } from "react-icons/pi";

const initialState = {
    username: '', 
    nickname: '', 
    bio: '', 
    avatar: '', 
    email: '', 
    personalizedLinks: ["https://github.com/kalachuuchiiii", "https://facebook.com/a.hopelieswithin"]
  }
const EditProfile = () => {
  const { user =  initialState} = useSelector(state => state.user);
  const [form, setForm] = useState({    ...user
  })
  
  useEffect(() => {
    setForm(user);
  }, [user])
  
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setForm(prev => ({
      ...prev, [name]: value
    }))
  }
  
  const inputStyle = "bg-zinc-900 rounded-lg outline-none w-full p-2";


return <div className = " mx-auto backdrop-brightness-25 rounded-lg p-4">
  <div className = "pt-4">
    <UserIcon className = "w-full flex justify-center items-center" user = {user}>
      <UserIcon.Avatar size = "30" />
    </UserIcon>
    <div className = "flex justify-center items-center">
          <input id = "avatar" name = "avatar" className = "hidden"  type = "file" accept="*/image" />
          <button onClick = {() => document.querySelector("#avatar").click()} className = "text-sm pt-3">Change avatar</button>
    </div>
    
  </div>
  <div className = "space-y-4">
      <div>
    <label className = "text-xs">Nickname</label>
    <input name = "nickname" onChange = {handleChange} placeholder = "Nickname" value = {form.nickname} className = {inputStyle} />
  </div>
  <div>
    <label className = "text-xs">Username</label>
    <input name = "username" onChange = {handleChange}  placeholder = "Username" value = {form.username} className = {inputStyle} />
  </div>

  <div>
    <label className = "text-xs">Bio</label>
    <Textarea placeholder = "A short description of yourself." name = "bio" onChange = {handleChange}  value = {form.bio} className = "bg-zinc-900 rounded-lg w-full p-2" />
  </div>
  </div>
  <div className = "space-y-3">
        <div>
    <label className = "text-xs">Email</label>
    <input readOnly name = "email"  value = {form.email} className = "outline-none w-full p-2 " />
  </div>
    <div>
    <label className = "text-xs">Password</label>
    <div className = "flex gap-1">
          <input readOnly name = "password"  value = "*********" className = "outline-none w-full p-2 " />
          <button className = "text-xs truncate shrink-0">Change Password</button>
    </div>
  </div>
  <div className = "flex justify-between p-2">
    <label>
      Your interests
    </label>
    <button className = "text-xl">+</button>
  </div>
  </div>
  <div className = "flex flex-col my-4 gap-4">
    <label className = "text-base items-center flex gap-1">Links<PiShareNetworkThin /></label>
    <div className = "text-sm flex flex-col gap-1 w-full">
      {
        initialState?.personalizedLinks && initialState?.personalizedLinks.map((link) => <a className = "p-1 w-full active:underline truncate opacity-75" href = {link}>{link}</a>)
      }
    </div>
    <div className = "flex">
       <input className = "text-sm my-2 p-2 outline-none w-11/12  border-l-1 border-l-white" placeholder = "Your personalized link."/>
    <button className = " w-16  shrink-0 text-sm rounded-lg text-white  ">Add</button>
    </div>
    
  </div>
  <button className = "w-full text-zinc-900 text-center bg-neutral-100 active:bg-zinc-900 active:text-neutral-100 rounded-lg py-2 ">Save</button>
</div>
}

export default EditProfile