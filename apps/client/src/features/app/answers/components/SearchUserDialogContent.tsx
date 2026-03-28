import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { UserBadge } from "@/components/ui/UserBadge";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  GetSurveyByIdResponse,
  GetUserByUsernameResponse,
} from "@inquestia/types";
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

const SearchUserDialogContent = ({
  survey,
}: {
  survey: GetSurveyByIdResponse["survey"];
}) => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const { surveyId = "" } = useParams();

  const {
    data: userResult,
    refetch: searchUser,
    isLoading: isSearchingUser,
  } = useQuery({
    queryFn: async () => {
      const p = api.get<GetUserByUsernameResponse>(
        `/api/user/username/${username}`
      );

      toast.promise(p, {
        loading: "Searching...",
        success: getSuccessMsg,
        error: getErrMsg,
      });

      const result = await p;
      return result.data.user;
    },
    queryKey: [`user-result-${surveyId}`],
    enabled: false,
  });

  const { revokeAuthorization, authorizeUser, isAuthorizingUser } =
    useSurveyActions();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Who would you like to share this survey with?</DialogTitle>
      </DialogHeader>

      <InputGroup>
        <InputGroupInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type username..."
        />
        <InputGroupButton
          onClick={() => searchUser()}
          disabled={isSearchingUser}
          className="p-4"
          variant={"outline"}
        >
          <CiSearch className="size-7" />
        </InputGroupButton>
      </InputGroup>
      <div>
        {userResult && (
          <div className="p-3 flex items-center justify-between">
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
        <div className="pl-2 py-5  border-t-1 border-t-black/10 ">
          <p className="text-xs my-2">Shared with</p>
          <div>
            {survey.authorizedViewers.length > 0 &&
              survey.authorizedViewers.map((viewer) => (
                <AlertDialog key={viewer._id}>
                  <Item className="grid w-full grid-cols-12">
                    <ItemHeader className="col-start-1 place-content-center col-span-8 ">
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
                    </ItemHeader>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to remove {viewer.displayName}{" "}
                          as your survey's viewer?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will notify {viewer.displayName}
                        </AlertDialogDescription>
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
                    <ItemActions className="place-content-center col-start-9 col-span-4">
                      <AlertDialogTrigger>
                        <Button variant={"outline"}>Remove</Button>
                      </AlertDialogTrigger>
                    </ItemActions>
                  </Item>
                </AlertDialog>
              ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default SearchUserDialogContent;
