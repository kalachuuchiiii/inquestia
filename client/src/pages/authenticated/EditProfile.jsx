import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { HiMiniPencil, HiOutlineChevronRight } from "react-icons/hi2";

import Textarea from "../../components/html/Textarea.jsx";
import UserIcon from "../../components/UserIcon.jsx";
import Button from "../../components/html/Button.jsx";
import ExternalLinksList from "../../components/lists/ExternalLinksList.jsx";

import EditNickname from "../../components/modals/edit/EditNickname.jsx";
import EditUsername from "../../components/modals/edit/EditUsername.jsx";
import EditBio from "../../components/modals/edit/EditBio.jsx";
import ChangePasswordModal from "../../components/modals/edit/ChangePasswordModal.jsx";
import ChangeAvatarModal from "../../components/modals/edit/ChangeAvatar.jsx";

import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";
import { updateUser } from "../../state/slice/user.js";
import { capitalize } from "../../utils/capitalize.js";
import { capitalizeFirstLetter } from "../../utils/formatTopicQuery.js";
import UpdateGender from "../../components/modals/edit/UpdateGender.jsx";

const ProfileInput = ({ label, value, placeholder, onEditClick, readOnly = true }) => {
  const inputStyle = "outline-none w-full p-2";
  const wrapperStyle =
    "rounded-lg overflow-hidden px-2 pt-1 bg-neutral-200 dark:bg-zinc-900 flex items-start";

  return (
    <div>
      <label className="text-xs">{label}</label>
      <div className={wrapperStyle}>
        <input
          readOnly={readOnly}
          placeholder={placeholder}
          value={value}
          className={inputStyle}
        />
        {onEditClick && (
          <button
            onClick={onEditClick}
            aria-label={`Edit ${label}`}
            className="pt-3 pb-4 px-3"
          >
            <HiMiniPencil />
          </button>
        )}
      </div>
    </div>
  );
};


// 🔹 Manage which modal is active
const ModalManager = ({ activeModal, close, user }) => {
  const modals = {
    nickname: (
      <EditNickname
        previousNickname={user?.nickname || user?.username || ""}
        onClose={close}
      />
    ),
    username: (
      <EditUsername previousUsername={user?.username || ""} onClose={close} />
    ),
    bio: <EditBio previousBio={user.bio} onClose={close} />,
    password: <ChangePasswordModal onClose={close} />,
    avatar: <ChangeAvatarModal onClose={close} />,
    gender: <UpdateGender onClose={close} />,
  };

  return (
    <AnimatePresence>{activeModal && modals[activeModal]}</AnimatePresence>
  );
};


const EditProfile = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [externalLink, setExternalLink] = useState("");
  const dispatch = useDispatch();

  const { user = { externalLinks: [], username: "", nickname: "", email: "", bio: "", avatar: null, interests: [] } } =
    useSelector((state) => state.user);

  const [saveExternalLink, { isLoading, error }] = useAsync(async () => {
    if (!externalLink || typeof externalLink !== "string") return;
    const res = await fetchApi("patch", "/user/link", { externalLink });
    if (res?.success && res?.user) {
      dispatch(updateUser({ user: res.user }));
      setExternalLink("");
    }
  });

  return (
    <>
      <ModalManager activeModal={activeModal} close={() => setActiveModal(null)} user={user} />

      <div className="w-full sm:w-[95%] mx-auto rounded-lg p-4">
        <div className="pt-4">
          <UserIcon className="w-full flex justify-center items-center" user={user}>
            <UserIcon.Avatar size="40" />
          </UserIcon>
          <div className="flex justify-center items-center">
            <button onClick={() => setActiveModal("avatar")} className="text-sm pt-3">
              Change avatar
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <ProfileInput
            label="Nickname"
            value={user.nickname || user.username}
            placeholder="Nickname"
            onEditClick={() => setActiveModal("nickname")}
          />

          <ProfileInput
            label="Username"
            value={user.username}
            placeholder="Username"
            onEditClick={() => setActiveModal("username")}
          />

          <div>
            <label className="text-xs">Bio</label>
            <div className="rounded-lg overflow-hidden px-2 pt-1 bg-neutral-200 dark:bg-zinc-900 flex items-start">
              <Textarea
                className=""
                placeholder="No bio yet."
                readOnly
                displayLimit={false}
                value={user.bio}
              />
              <button
                onClick={() => setActiveModal("bio")}
                aria-label="Edit bio"
                className="pt-3 pb-4 px-3"
              >
                <HiMiniPencil />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 flex  justify-between">
           <div>
            <label className="text-xs">Gender</label>
            <p className="outline-none w-full p-2" >{capitalizeFirstLetter(user?.gender || '')}</p>
           </div>
           <button onClick={() => setActiveModal("gender")} className="p-5">
              <HiMiniPencil />
           </button>
        </div>
        <div className="space-y-3 mt-4">
          <div>
            <label className="text-xs">Email</label>
            <input readOnly value={user.email} className="outline-none w-full p-2" />
          </div>
          <div>
            <label className="text-xs">Password</label>
            <div className="flex gap-1">
              <input readOnly value="*********" className="outline-none w-full p-2" />
              <button
                onClick={() => setActiveModal("password")}
                className="text-xs truncate shrink-0"
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="p-2">
            <NavLink to="/interests" className="flex items-center justify-between">
              <label>Your interests</label>
              <HiOutlineChevronRight />
            </NavLink>
            <div className="text-xs grid grid-cols-2 opacity-50">
              {user?.interests?.length > 0 &&
                user.interests.map((interest, idx) => (
                  <p key={idx}>{capitalizeFirstLetter(interest)}</p>
                ))}
            </div>
          </div>
        </div>

        <div className="flex border-l-1 border-l-white px-3 py-1 flex-col my-8 gap-4">
          <ExternalLinksList externalLinks={user.externalLinks} />
          <div className="flex flex-col">
            <input
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="text-sm my-2 p-2 dark:text-neutral-100 outline-none w-11/12"
              placeholder="Your external link here..."
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>
          <Button
            disabled={externalLink.length < 5 || isLoading}
            className={`w-full p-2 bg-neutral-100 flex justify-center items-center h-11 rounded-lg text-zinc-900 ${
              externalLink.length > 5
                ? "active:bg-zinc-900 active:text-neutral-100"
                : "opacity-50"
            }`}
            loadingState={isLoading}
            onClick={saveExternalLink}
          >
            Save Link
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
