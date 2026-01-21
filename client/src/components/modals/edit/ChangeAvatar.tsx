import ModalStyle from "../ModalStyle.jsx";
import { useSelector } from "react-redux";
import { UserBadge } from "../../UserBadge.js";
import { useEffect, useState, type ChangeEvent } from "react";
import { GoArrowSwitch } from "react-icons/go";
import useAsync from "../../../hooks/useAsync.js";
import { updateUser } from "../../../state/slice/user.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { LuImagePlus } from "react-icons/lu";
import { Button } from "@/components/ui/button.js";

const ChangeAvatar = ({ onClose = () => {} }) => {
  const dispatch = useDispatch();
  const { user = { avatar: null } } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const [handleSave, { isLoading, error, isSuccess }] = useAsync(async () => {
    if (!avatar) throw new Error("You need to select an avatar.");
    const formData = new FormData();
    formData.append("avatar", avatar);
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/user/change-avatar`,
      formData,
      { withCredentials: true }
    );

    if (!res?.data?.success) {
      throw new Error("Avatar upload failed.");
    }
    dispatch(updateUser({ user: res.data.user }));
    onClose();
    return res;
  }, [avatar]);

  return (
    <ModalStyle label="Change Avatar" onClose={onClose}>
      <div className="p-2 flex items-center justify-between gap-3 my-7">
        <UserBadge user={user} />
        {isSuccess && (
          <p className="text-xs text-blue-400">Avatar successfully updated!</p>
        )}
        <div className="space-y-1">
          <Button onClick={handleSave} disabled={isLoading}>
            Save
          </Button>
        </div>
      </div>
    </ModalStyle>
  );
};

export default ChangeAvatar;
