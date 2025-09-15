import UserProfile from '../../components/card/UserProfileCard.jsx';

import SettingCard from '../../components/card/SettingCard.jsx';
import { useSelector } from 'react-redux';
import Textarea from '../../components/html/Textarea.jsx';
import ExternalLinksList from '../../components/lists/ExternalLinksList.jsx';
import { useEffect, useState } from 'react';
import ArrowButton from '../../components/html/ArrowButton.jsx';
import useAsync from '../../hooks/useAsync.js';
import { Outlet, NavLink } from "react-router-dom"
import { fetchApi } from '../../utils/fetchApi.js';
import SurveyCard from '../../components/card/SurveyCard.jsx';
import { useInView } from 'react-intersection-observer';
import useFieldArray from '../../hooks/useFieldArray.js';
import usePath from '../../hooks/usePath.js';
import Dashboard from '../../components/Dashboard.jsx';
const Profile = () => {
  const { user = {} } = useSelector(state => state.user);

  const { isInThisPath } = usePath();

  return (
    <>
      <div className=" space-y-3">
        <div className=" p-6 shadow-lg space-y-3 rounded-lg">
          <div className="space-y-4">
            <UserProfile user={user} />
          </div>
          <div className="space-y-6 mt-5">
            <ArrowButton
              className="dark:bg-neutral-100 bg-zinc-900 text-neutral-100 text-xs rounded w-fit dark:text-zinc-900 px-6 py-2 text-center"
              to="/profile/edit"
            >
              View Account
            </ArrowButton>
          </div>
        </div>
        <div className="flex gap-1 w-full justify-center items-center">
          <NavLink
            to="/profile"
            className={` text-center w-full  p-2 ${
              isInThisPath("/profile") && " border-b-zinc-900 dark:border-b-neutral-100  border-b-1"
            }`}
          >
            Posts
          </NavLink>
          <NavLink
            to="/profile/drafts"
            className={`  text-center w-full p-2 ${
              isInThisPath("/profile/drafts") &&
              " border-b-zinc-900 border-b-1 dark:border-b-neutral-100"
            }`}
          >
            Drafts
          </NavLink>
        </div>
        <div className="min-h-50 space-y-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Profile