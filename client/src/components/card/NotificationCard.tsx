

import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchApi } from '../../utils/fetchApi';
import { formatIsoString } from '../../utils/formatIsoString';
import { UserBadge } from '../UserBadge';

const NotificationCard = ({notif = {}}) => {
  const nav = useNavigate();

  const handleNavigate = async() => {
    try {
      const res = await fetchApi('patch', `/notification/mark-as-read/${notif._id}`);
    } catch (error) {
  
    }finally{
      nav(notif.path);
    }
  }


  return (
    <>
      <div
        className={`flex flex-col items-start hover:backdrop-brightness-90 transition-all duration-200 gap-3 p-2 rounded-lg ${
          !notif.isRead ? "bg-blue-50 dark:bg-zinc-800" : ""
        }`}
      >
        <UserBadge user={notif.sender} />
        <button
          onClick={handleNavigate}
          className="flex gap-1 text-xs text-left"
        >
          <div className=" text-gray-500 dark:text-gray-300">
            {notif.message}
          </div>
          
        </button>
          <p className='text-xs text-left opacity-50'>{formatIsoString(notif?.createdAt)}</p>
      </div>
    </>
  );
}

export default NotificationCard
