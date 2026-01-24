import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { toast } from "sonner";
import type { AuthorizeUserResponse, SurveyDTO } from "@shared/types";
import { useNavigate } from "react-router-dom";

export const useSurveyActions = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const { mutate: deleteSurvey } = useMutation({
    mutationFn: async (id: string) => {
      const p = api.patch(`/api/survey/soft-delete/${id}`);
      await toast.promise(p, {
        loading: "Deleting survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["survey-list"] });
      nav("/home");
    },
  });

  const { mutate: authorizeUser, isPending: isAuthorizingUser } = useMutation({
    mutationFn: async ({
      surveyId,
      userId,
    }: {
      surveyId: string;
      userId: string;
    }) => {
      const p = api.patch<AuthorizeUserResponse>(
        `/api/survey/authorize-user/${surveyId}/${userId}`
      );
      await toast.promise(p, {
        loading: "Authorizing user...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: ["survey", params.surveyId],
      });
      queryClient.setQueryData([`user-result-${params.surveyId}`], null);
    },
  });

  const { mutate: revokeAuthorization } = useMutation({
    mutationFn: async ({
      surveyId,
      userId,
    }: {
      surveyId: string;
      userId: string;
    }) => {
      toast.loading("Revoking user's authorization...", {
        id: "revoke-authorization",
      });
      const res = await api.patch(
        `/api/survey/revoke-authorization/${surveyId}/${userId}`
      );
      toast.dismiss("revoke-authorization");
    },
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: ["survey", params.surveyId],
      });
    },
  });

  const { mutate: closeSurvey, isPending: isClosingSurvey } = useMutation({
    mutationFn: async (surveyId: string) => {
      const p = api.patch(`/api/survey/close-survey/${surveyId}`);
      await toast.promise(p, {
        loading: "Closing survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: async (_, surveyId) => {
      queryClient.setQueryData<SurveyDTO>(['survey', surveyId], (old) => {
        if(!old)return;
        return {
          ...old,
          isClosed: true
        }
      })
    },
  });

   const { mutate: reOpenSurvey, isPending: isReOpeningSurvey } = useMutation({
    mutationFn: async (surveyId: string) => {
      const p = api.patch(`/api/survey/reopen-survey/${surveyId}`);
      await toast.promise(p, {
        loading: "Reopening survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: async (_, surveyId) => {
      queryClient.setQueryData<SurveyDTO>(['survey', surveyId], (old) => {
        if(!old)return;
        return {
          ...old,
          isClosed: false
        }
      })
    },
  });

  return {
    deleteSurvey,
    closeSurvey,
    isClosingSurvey,
    revokeAuthorization,
    isAuthorizingUser,
    reOpenSurvey,
    isReOpeningSurvey,
    authorizeUser,
  };
};
