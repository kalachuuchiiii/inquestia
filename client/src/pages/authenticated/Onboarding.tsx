import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "../../components/ui/button";
import { updateUser } from "../../state/slice/user.js";
import InterestTagList from "../../components/lists/InterestTagList.jsx";
import AnimationWrapper from "../../components/AnimationWrapper.jsx";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import { useMutation } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi.js";
import { toast } from "sonner";
import type { Interest, INTEREST_ENUM, UpdateInterestResponse, UserDTO } from "@shared/index.js";
import { motion } from 'framer-motion';
import { fromBottom } from "@/lib/variants.js";

const Onboarding = () => {
  const { user } = useAppSelector((state) => state.user);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(user.interests);
  const nav = useNavigate();

  //int
  const dispatch = useDispatch();
  const api = useApi(); 

  const { mutate: saveInterests, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const p = api.patch<UpdateInterestResponse>("/api/user/interests", {
        interests: selectedInterests,
      });
      await toast.promise(p, {
        loading: "Updating your interests...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: (res) => {
      dispatch(
        updateUser({ user: { ...user, interests: res.data.interests } })
      );
      nav("/home");
    },
  });

  const deselectInterest = (value: Interest) => {
    setSelectedInterests((prev) => prev.filter((val) => val !== value));
  };

  const selectInterest = (value: Interest) => {
    if (selectedInterests.includes(value)) {
      deselectInterest(value);
    } else {
      if (selectedInterests.length >= 10) return;
      setSelectedInterests((prev) => [...prev, value]);
    }
  };

  return (
    <motion.div
     variants={fromBottom}
     initial = 'hidden'
     animate = 'visible'
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
        <InterestTagList select={selectInterest} selected={selectedInterests} />
      </div>

      {/* 🔹 Save Button */}
      <div className="w-full max-w-3xl flex justify-end pt-6">
        <div className="w-full sm:w-1/2 space-y-2 flex flex-col items-end">
          <Button disabled={isLoading} onClick={() => saveInterests()}>
            {isLoading ? "Saving..." : "Save Interests"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Onboarding;
