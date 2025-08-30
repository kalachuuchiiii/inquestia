import { useEffect, useState } from 'react';
import useToggler from '../../hooks/useToggler.js';
import LogoutModal from '../modals/LogoutModal.jsx';
import { AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom"

const SettingButton = ({ children = null, onClick = () => { } }) => {
  return <button onClick={onClick} className="w-full flex justify-between items-center p-2">
    {children}
  </button>
}



const SettingCard = ({ children = null }) => {

  return <div>
    <div className=" my-8 p-2">
      <h1 className=" text-4xl lato">Settings</h1>
      <p className="text-base ">Adjust themes, and Manage your account, to your preferences
      </p>
    </div>
    <div className="space-y-4">
      {
        children
      }
    </div>
  </div>
}

SettingCard.Theme = () => {
  return <div className = "w-full justify-between flex p-2">
    <p>Theme</p>
    <select className = "outline-none">
      <option>Light</option>
      <option>Dark</option>
    </select>
  </div>
}

SettingCard.NewOption = ({ label = "", children = null }) => {

  return <div className=" rounded-lg py-3 px-6">
    <p className="font-bold text-lg my-3">{label}</p>
    <div className="flex flex-col gap-1 items-start text-sm divide-y-1">
      {children}
    </div>
  </div>
}




SettingCard.Logout = ({ onClick = () => { } }) => {
  const [isLogoutModalOpen, open, close, toggle] = useToggler();

  return <>
    <AnimatePresence>
      {isLogoutModalOpen && <LogoutModal onClose={close} />}
    </AnimatePresence>
    <SettingButton>
      <button onClick={toggle} className="text-red-400">Logout</button>
    </SettingButton>
  </>
}

SettingCard.Account = () => {
  return <SettingButton>
    <NavLink to="/profile/edit">
      <p>Update profile</p>
    </NavLink>
  </SettingButton>
}

export default SettingCard