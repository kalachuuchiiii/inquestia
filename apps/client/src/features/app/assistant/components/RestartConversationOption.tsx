import { RotateCcw } from "lucide-react";
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
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import useAssistant from "@/features/app/assistant/hooks/useAssistant";

export const RestartConversationOption = () => {
  const { restartConversation, isRestartingConversation } = useAssistant();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="mr-4"> 
        <Button variant={'outline'}>
          <RotateCcw />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Restart Conversation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to restart this conversation?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="w-full flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => restartConversation()}
              disabled={isRestartingConversation}
              
            >
              Restart
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
