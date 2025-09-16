import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/html/Button.jsx";
import useAsync from "../../hooks/useAsync.js";
import { fetchApi } from "../../utils/fetchApi.js";
import { updateUser } from "../../state/slice/user.js";
import InterestTagList from "../../components/lists/InterestTagList.jsx";
import AnimationWrapper from "../../components/AnimationWrapper.jsx";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const { user = { interests: [] } } = useSelector((state) => state.user);
  const [selectedInterests, setSelectedInterests] = useState(
    user?.interests || []
  );
  const nav = useNavigate()

  //int
  const dispatch = useDispatch();

  const [saveInterests, { isLoading, error }] = useAsync(async () => {
    const res = await fetchApi("patch", "/user/interests", {
      selectedInterests,
    });
    if (res?.success && res?.user) {
      dispatch(updateUser({ user: res.user }));
      nav('/home')

    }
  });

  useEffect(() => {
    setSelectedInterests(user?.interests);
  }, [user]);

  const deselectInterest = (value) => {
    setSelectedInterests((prev) => prev.filter((val) => val !== value));
  };

  const selectInterest = (value) => {

    if (selectedInterests.includes(value)) {
      deselectInterest(value);
    } else {
          if (selectedInterests.length >= 10) return;
      setSelectedInterests((prev) => [...prev, value]);
    }
  };

  return (
    <AnimationWrapper
      variants="fromBottom"
      className="w-full sm:w-11/12 mx-auto min-h-screen flex flex-col items-center py-10 px-4 space-y-6"
    >
      {/* 🔹 Header Section */}
      <div className="max-w-2xl text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Tell us about your interests ✨
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Choosing your interests helps us suggest the right questions for you,
          making your experience more relevant and engaging.
        </p>
      </div>

      {/* 🔹 Interest Selection */}
      <div className="w-full max-w-3xl">
        <InterestTagList
          select={selectInterest}
          selected={selectedInterests}
        />
      </div>

      {/* 🔹 Save Button */}
      <div className="w-full max-w-3xl flex justify-end pt-6">
        <div className="w-full sm:w-1/2 space-y-2 flex flex-col items-end">
          {error && <p className="text-xs text-red-400">{error}</p>}
          <Button
            disabled={isLoading}
            onClick={saveInterests}
            loadingState={isLoading}
          >
            Save Interests
          </Button>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Onboarding;
