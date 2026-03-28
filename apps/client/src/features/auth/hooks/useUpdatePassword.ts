import api from "@/lib/axios.instance";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UpdatePasswordFormSchema } from "@inquestia/schemas";
import { getErrMsg } from "@/utils/getErrMsg";
import { getSuccessMsg } from "@/utils/getSuccessMsg";

export const useUpdatePassword = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState("");

  const {
    mutate: updatePasswordRequest,
    isPending: isRequestingPasswordUpdate,
  } = useMutation({
    mutationFn: async () => {
      if (timer > 0) return;
      const p = api.post("/api/auth/update-password-request");
      await toast.promise(p, {
        loading: "Sending verification code...",
        error: (err) => err.response.data.message,
        success: (res) => res.data.message,
      });
      const res = await p; //sends on the user's id on session;
      return res.data;
    },

    mutationKey: ["verify-change-pass"],
    onSuccess: () => {
      setTimer(60);
      setIsCodeSent(true);
    },
  });

  const { mutate: verifyUpdateRequestCode, isPending: isVerifyingCode } =
    useMutation({
      mutationFn: async (verifyCode: string) => {
        const p = api.post("/api/auth/verify-update-password-code", {
          code: verifyCode,
        });
        await toast.promise(p, {
          loading: "Verifying code...",
          error: (err) => err.response.data.message,
          success: (res) => res.data.message,
        });
        return await p;
      },
      mutationKey: ["verify-update-code"],
      onSuccess: () => {
        navigate("/update-password");
      },
    });

  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationFn: async (updateForm: {
        newPassword: string;
        confirmPassword: string;
      }) => {
        
        
        const promise = new Promise((resolve) => {
            const validation = Promise.resolve(UpdatePasswordFormSchema.parse(updateForm));

           resolve(api.post("/api/auth/update-password", {
            password: updateForm.newPassword,
          }))
        })


         await toast.promise(promise, {
          loading: "Updating password...",
          error: getErrMsg,
          success: getSuccessMsg,
        });
        return await promise;
      },
      mutationKey: ["update-password"],
      onSuccess: () => {
        navigate("/home");
      },
    }
  );

  const handleChangeCode = (value: string) => {
    setCode(value);
  };

  useEffect(() => {
    if (timer === 0) return;

    const intervalId = setInterval(() => {
      setTimer((prev) => (prev === 0 ? prev : prev - 1));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [isCodeSent]);

  return {
    updatePasswordRequest,
    verifyUpdateRequestCode,
    updatePassword,
    timer,
    code,
    isCodeSent,
    handleChangeCode,
    isRequestingPasswordUpdate,
    isVerifyingCode,
    isUpdatingPassword,
  };
};
