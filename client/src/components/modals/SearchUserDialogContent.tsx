import { useEffect, useState } from "react";
import ModalStyle from "./ModalStyle";
import { CiSearch } from "react-icons/ci";
import { UserBadge } from "../UserBadge";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { useParams } from "react-router-dom";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type {
  GetSurveyByIdResponse,
  GetUserByUsernameResponse,
} from "@shared/types";
import { Item, ItemActions, ItemHeader } from "../ui/item";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useSurveyActions } from "@/hooks/useSurveyActions";

const SearchUserDialogContent = ({
  survey,
}: {
  survey: GetSurveyByIdResponse["survey"];
}) => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const { surveyId = "" } = useParams();
  const api = useApi();

  const {
    data: userResult,
    refetch: searchUser,
    isLoading: isSearchingUser,
  } = useQuery({
    queryFn: async () => {
      const res = await api.get<GetUserByUsernameResponse>(
        `/api/user/username/${username}`
      );
      return res.data.userResult;
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
              <UserBadge user={userResult} displayBadge />
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
                      <UserBadge displayBadge user={viewer} />
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
