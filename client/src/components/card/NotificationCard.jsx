

import React from 'react'
import UserIcon from '../UserIcon'
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchApi } from '../../utils/fetchApi';

const NotificationCard = ({notif = {}}) => {
  const nav = useNavigate();

  const handleNavigate = async() => {
    try {
      const res = await fetchApi('patch', `/notification/mark-as-read/${notif._id}`);
    } catch (error) {
      console.log(error)
    }finally{
      nav(notif.path);
    }
  }


  return (
    <>
      <div
        className={`flex flex-col items-start gap-3 p-2 rounded-lg ${
          !notif.isRead ? "bg-blue-50 dark:bg-zinc-800" : ""
        }`}
      >
        <UserIcon user={notif.sender}>
          <UserIcon.Card />
        </UserIcon>
        <button onClick = {handleNavigate} className="flex-1">
          <div className="text-xs text-gray-500 dark:text-gray-300">
            {notif.action === "answer"
              ? "Answered your question"
              : "Survey Completed"}
          </div>
        </button>
      </div>
    </>
  );
}

export default NotificationCard