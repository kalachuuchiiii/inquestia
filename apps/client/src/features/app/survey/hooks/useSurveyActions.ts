import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios.instance";
import { toast } from "sonner";

import { useNavigate, useParams } from "react-router-dom";
import {
  SurveyFormSchema,
  type Survey,
  type SurveyForm,
} from "@inquestia/schemas";
import { getSuccessMsg } from "@/utils/getSuccessMsg";
import { getErrMsg } from "@/utils/getErrMsg";

export const useSurveyActions = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { surveyId = "" } = useParams();

  const { mutate: saveSurvey, isPending: isSavingSurvey } = useMutation({
    mutationFn: async (form: SurveyForm) => {
      const p = api.patch(`/api/survey/${surveyId}/save`, {
        form,
      });
      toast.promise(p, {
        loading: "Saving survey...",
        success: getSuccessMsg,
        error: getErrMsg,
      });
      return await p;
    },
    onSuccess: () => {
      nav("/my-profile");
    },
  });

  const { mutate: createSurvey, isPending: isCreatingSurvey } = useMutation({
    mutationFn: async (survey: SurveyForm) => {
      const p = api.post("/api/survey", {
        survey,
      });
      toast.promise(p, {
        loading: "Creating survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: () => {
      nav("/my-profile");
    },
  });

  const { mutate: deleteSurvey } = useMutation({
    mutationFn: async (id: string) => {
      const p = api.delete(`/api/survey/${id}`);
      await toast.promise(p, {
        loading: "Deleting survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["survey-list"] });
      nav("/feed");
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
      const p = api.patch(`/api/survey/${surveyId}/authorize/${userId}`);
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
      const res = await api.patch(`/api/survey/${surveyId}/revoke/${userId}`);
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
      const p = api.patch(`/api/survey/${surveyId}/close`);
      await toast.promise(p, {
        loading: "Closing survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: async (_, surveyId) => {
      queryClient.setQueryData<Survey>(["survey", surveyId], (old) => {
        if (!old) return;
        return {
          ...old,
          isClosed: true,
        };
      });
    },
  });

  const { mutate: reOpenSurvey, isPending: isReOpeningSurvey } = useMutation({
    mutationFn: async (surveyId: string) => {
      const p = api.patch(`/api/survey/${surveyId}/reopen`);
      await toast.promise(p, {
        loading: "Reopening survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: async (_, surveyId) => {
      queryClient.setQueryData<Survey>(["survey", surveyId], (old) => {
        if (!old) return;
        return {
          ...old,
          isClosed: false,
        };
      });
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
    saveSurvey,
    isSavingSurvey,
    createSurvey,
    isCreatingSurvey,
    queryClient,
  };
};
