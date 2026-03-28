import { useEffect, useState } from "react";
import axios from "axios";
import type { RegisterForm } from "@inquestia/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import API from "@/lib/axios.instance";
import { useAuth } from "./useAuth";
import type { TextInput } from "@/types";

const useRegister = () => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    username: "",
    password: "",
    hasAcceptedPrivacyPolicy: false, 
    code: ''
  });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const { register, isRegistering } = useAuth();
  const handleRegister = async () => register({ code, form: registerForm });
  const [timer, setTimer] = useState(0);

  const { mutate: sendCode, isPending: isSendingCode } = useMutation({
    mutationFn: async () => {
      const promise = API.post(`/api/auth/register-otp`, {
        ...registerForm
      });
      await toast.promise(promise, {
        loading: "Sending code...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message 
      });
      return await promise;
    },
    onSuccess: () => {
      setIsCodeSent(true);
      setTimer(60);
    },
  });

  const handleChangeCode = (value: string) => {
    setCode(value);
  };

  const handleChangeForm = (e: TextInput) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isCodeSent) return;
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        return prev === 0 ? prev : prev - 1
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [isCodeSent]);

  const handleToggleAcceptPP = () => setRegisterForm((prev) => ({ ...prev, hasAcceptedPrivacyPolicy: !prev.hasAcceptedPrivacyPolicy }))

  return {
    handleChangeCode,
    handleToggleAcceptPP,
    register: handleRegister,
    isRegistering,
    sendCode,
    handleChangeForm,
    isSendingCode,
    code,
    registerForm,
    isCodeSent,
    timer,
  };
};

export default useRegister;
