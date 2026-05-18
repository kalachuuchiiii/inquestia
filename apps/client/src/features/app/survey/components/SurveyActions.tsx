import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useSurveyActions } from "@/features/app/survey/hooks/useSurveyActions";
import type { Survey, User } from "@inquestia/schemas";
import {
  EllipsisVerticalIcon,
  Eye,
  LockKeyhole,
  Trash2,
  UnlockKeyhole,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import SearchUserDialogContent from "../../answers/components/SearchUserDialogContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QRCodeCanvas } from "qrcode.react";
import { BsDownload } from "react-icons/bs";
import { useRef } from "react";

export const SurveyActions = ({
  user,
  survey,
}: {
  user: User;
  survey: Survey;
}) => {
  const { surveyId = "" } = useParams();
  const {
    deleteSurvey,
    closeSurvey,
    isClosingSurvey,
    reOpenSurvey,
    isReOpeningSurvey,
  } = useSurveyActions();
  const qrParent = useRef<HTMLDivElement>(null);
  const downloadQr = () => {
    if (!qrParent.current) return;
    const canvas = qrParent.current.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = `survey-${survey?._id}-qr.png`;
    a.click();
  };

  const isAuthorized =
    user?._id === survey?.author?._id ||
    survey?.authorizedViewers?.some((v) => String(v._id) === user?._id);

  return (
    <div className="flex  items-center flex-wrap gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"outline"}>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex">
          <main className="flex flex-col justify-center items-center w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant={"ghost"}>
                      <Users /> Authorized
                    </Button>
                  </DialogTrigger>
                  <SearchUserDialogContent survey={survey} />
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {isAuthorized && (
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <Link to={`/survey-answers/${survey._id}`}>
                    <Button variant={"ghost"} className="inquestia-button">
                      <Eye /> View answers
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  {!survey?.isClosed ? (
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="ghost">
                          <LockKeyhole /> Close survey
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to close this survey?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Closing this survey will not delete any of its
                            responses or data. only its availability to
                            respondents.
                          </AlertDialogDescription>
                          <AlertDialogDescription>
                            You can still re-open this survey.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <main className="flex items-center justify-end gap-2">
                          <AlertDialogCancel>No, Cancel</AlertDialogCancel>
                          <Button
                            variant={"destructive"}
                            disabled={isClosingSurvey}
                            onClick={() => closeSurvey(surveyId)}
                          >
                            Yes, close this survey
                          </Button>
                        </main>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant={"ghost"}>
                          <UnlockKeyhole /> Reopen
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Re-open this survey?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Button
                            disabled={isReOpeningSurvey}
                            onClick={() => reOpenSurvey(surveyId)}
                            variant={"outline"}
                          >
                            Re-open
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant={"ghost"}>
                        <Trash2 /> Delete survey
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this survey?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You can still recover this later
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>No, cancel</AlertDialogCancel>

                        <Button
                          disabled={!surveyId}
                          onClick={() => deleteSurvey(surveyId)}
                          variant="destructive"
                        >
                          Yes, delete this survey
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
          </main>
          <div className="flex items-center flex-col px-6 py-4 gap-6 justify-between w-full">
            <div ref={qrParent}>
              <QRCodeCanvas
                value={window.location.href}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                className="mx-auto"
                includeMargin={false}
              />
            </div>

            <Button
              variant={"outline"}
              onClick={downloadQr}
              className="text-xs gap-2 flex w-full items-center"
            >
              <BsDownload /> Download
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
