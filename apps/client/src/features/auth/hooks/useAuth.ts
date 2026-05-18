import type { AppDispatch } from "@/state/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/axios.instance";
import type { LoginForm } from "@inquestia/schemas";
import { useAccount } from "@/features/app/account/hooks/useAccount";

export const useAuth = () => {
  const nav = useNavigate();
  const { data: user, refetch } = useAccount();
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async (form: LoginForm) => {
      const p = api.post("/api/auth/login", { ...form });
      await toast.promise(p, {
        loading: "Logging you in...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: () => {
      refetch();
      nav("/feed");
    },
  });

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      const promise = api.post("/api/auth/logout");
      await toast.promise(promise, {
        loading: "Logging you out...",
        error: (err) => err.response.data.message,
        success: (res) => res.data.message,
      });
      return promise;
    },
    onSuccess: () => {
      queryClient.cancelQueries();
      queryClient.clear();
      window.location.href = "/sign-in";
    },
  });

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: async ({
      code,
      form,
    }: {
      code: string;
      form: LoginForm & { username: string };
    }) => {
      const p = api.post(`/api/auth/register`, {
        ...form,
        code,
      });
      await toast.promise(p, {
        loading: "Creating your account...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: () => {
      nav("/login");
    },
  });

  return {
    login,
    logout,
    register,
    isRegistering,
    isLoggingOut,
    isLoggingIn,
  };
};
