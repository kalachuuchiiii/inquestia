import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";

import InterestTagList from "@/features/app/survey/components/InterestTagList.js";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { fromBottom } from "@/lib/variants.js";
import api from "@/lib/axios.instance";
import type { Interest } from "@inquestia/constants";
import { useAccount } from "../hooks/useAccount";
import { getErrMsg } from "@/utils/getErrMsg";
import { getSuccessMsg } from "@/utils/getSuccessMsg";

const Onboarding = () => {
  const { data: user, refetch } = useAccount();
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(
    (user?.interests as Interest[]) ?? []
  );
  const nav = useNavigate();

  const { mutate: saveInterests, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const p = api.patch<{ interests: Interest[]; message: string }>(
        "/api/user/me/interests",
        {
          interests: selectedInterests,
        }
      );
      toast.promise(p, {
        loading: "Updating your interests...",
        success: getSuccessMsg,
        error: getErrMsg,
      });
      return await p;
    },
    onSuccess: () => {
      nav("/feed");
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
    <div className="w-full sm:w-11/12 mx-auto min-h-screen flex flex-col items-center py-10 px-4 space-y-6">
      <div className="max-w-2xl text-left space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">
          Tell us about your interests
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
    </div>
  );
};

export default Onboarding;
