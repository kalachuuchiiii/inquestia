import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { UserBadge } from "@/components/ui/UserBadge";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Item, ItemActions, ItemHeader } from "@/components/ui/item";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { useSurveyActions } from "@/features/app/survey/hooks/useSurveyActions";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { getSuccessMsg } from "@/utils/getSuccessMsg";
import { getErrMsg } from "@/utils/getErrMsg";
import api from "@/lib/axios.instance";
import type { Survey, User } from "@inquestia/schemas";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Search, Users } from "lucide-react";
import { useAccount } from "../../account/hooks/useAccount";

const SearchUserDialogContent = ({ survey }: { survey: Survey }) => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const { surveyId = "" } = useParams();
  const { data: user } = useAccount();

  const isMine = user?._id === survey.author?._id;

  const {
    data: userResult,
    refetch: searchUser,
    isLoading: isSearchingUser,
  } = useQuery({
    queryFn: async () => {
      const p = api.get<{ user: User }>(`/api/user/username/${username}`);

      toast.promise(p, {
        loading: "Searching...",
        success: getSuccessMsg,
        error: getErrMsg,
      });

      const result = await p;
      return result.data.user;
    },
    retry: false,
    queryKey: [`user-result-${surveyId}`],
    enabled: false,
  });

  const { revokeAuthorization, authorizeUser, isAuthorizingUser } =
    useSurveyActions();

  return (
    <DialogContent>
      {isMine && (
        <>
          <DialogHeader className="mb-4">
            <DialogTitle>
              Who would you like to share this survey with?
            </DialogTitle>
            <DialogDescription>
              Sharing this survey to a person would mean they would be able to
              see and monitor the answer of this!
            </DialogDescription>
          </DialogHeader>

          <InputGroup>
            <InputGroupInput
              value={username}
              onKeyDown={(e) =>
                !e.shiftKey &&
                e.key === "Enter" &&
                username.trim() &&
                searchUser()
              }
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type username..."
            />
            <InputGroupButton
              onClick={() => searchUser()}
              disabled={isSearchingUser}
              className="p-4"
              variant={"ghost"}
            >
              <CiSearch className="size-5" />
            </InputGroupButton>
          </InputGroup>
        </>
      )}
      <div>
        {userResult && (
          <div className=" flex items-center justify-between">
            <div className=" place-content-center">
              <UserBadge
                user={userResult}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <UserBadge.Avatar className="size-10" />
                  <div className="flex flex-col ">
                    <UserBadge.Nickname className="font-semibold lg:text-lg" />
                    <UserBadge.Username className="lg:text-base" />
                  </div>
                </div>
              </UserBadge>
            </div>
            <Button
              variant={"outline"}
              disabled={isAuthorizingUser}
              onClick={() =>
                authorizeUser({ surveyId, userId: userResult._id })
              }
            >
              Add
            </Button>
          </div>
        )}
        <div className="  border-t-1 border-t-black/10 ">
          <p className="text-sm my-2">
            These users are authorized to view the answers of this survey
          </p>
          <div className="py-2">
            {survey && (survey.authorizedViewers?.length ?? 0) > 0 ? (
              survey.authorizedViewers?.map((viewer) => (
                <div className="flex items-center justify-between ">
                  <header>
                    <UserBadge
                      user={viewer}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <UserBadge.Avatar className="size-10" />
                        <div className="flex flex-col ">
                          <UserBadge.Nickname className="font-semibold lg:text-lg" />
                          <UserBadge.Username className="lg:text-base" />
                        </div>
                      </div>
                    </UserBadge>
                  </header>

                  {isMine && (
                    <aside>
                      <AlertDialog key={viewer._id}>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to remove {viewer.username}{" "}
                              as your survey's viewer?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              onClick={() =>
                                revokeAuthorization({
                                  surveyId,
                                  userId: viewer._id,
                                })
                              }
                              variant={"destructive"}
                            >
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                        <AlertDialogTrigger>
                          <Button variant={"outline"}>Remove</Button>
                        </AlertDialogTrigger>
                      </AlertDialog>
                    </aside>
                  )}
                </div>
              ))
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia>
                    <Users />
                  </EmptyMedia>
                  <EmptyTitle>This survey is not shared with anyone</EmptyTitle>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default SearchUserDialogContent;
