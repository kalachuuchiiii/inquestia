import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios.instance";
import { toast } from "sonner";
import type {
  AuthorizeUserResponse,
  SurveyDTO,
  SurveyForm,
} from "@inquestia/types";
import { useNavigate } from "react-router-dom";
import { SurveyFormSchema } from "@inquestia/schemas";
import { getSuccessMsg } from "@/utils/getSuccessMsg";
import { getErrMsg } from "@/utils/getErrMsg";

export const useSurveyActions = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const { mutate: saveAsDraft, isPending: isSavingAsDraft } = useMutation({
    mutationFn: async (survey: SurveyForm) => {
      //will check ._id, if exist, update, else create ne wone
      const p = new Promise((resolve, reject) => {
        try {
          SurveyFormSchema.parse(survey);
          resolve(
            api.post(`/api/survey/drafts`, {
              survey: {
                ...survey,
                boost: 0,
                isDraft: true
              }
            })
          );
        } catch (e) {
          reject(e);
        }
      });
      await toast.promise(p, {
        loading: "Saving as draft...",
        success: getSuccessMsg,
        error: getErrMsg,
      });
      return await p;
    },
  });

  const { mutate: createSurvey, isPending: isCreatingSurvey } = useMutation({
    mutationFn: async (survey: SurveyForm) => {
      //will check whether isDraft, if no, reject else create
      const p = api.post("/api/survey", {
        survey,
      });
      await toast.promise(p, {
        loading: "Creating survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
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
        `/api/survey/${surveyId}/authorize/${userId}`
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
        `/api/survey/${surveyId}/revoke/${userId}`
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
      const p = api.patch(`/api/survey/${surveyId}/close`);
      await toast.promise(p, {
        loading: "Closing survey...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message,
      });
      return await p;
    },
    onSuccess: async (_, surveyId) => {
      queryClient.setQueryData<SurveyDTO>(["survey", surveyId], (old) => {
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
      queryClient.setQueryData<SurveyDTO>(["survey", surveyId], (old) => {
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
    createSurvey,
    isCreatingSurvey,
    saveAsDraft,
    isSavingAsDraft,
    queryClient,
  };
};
