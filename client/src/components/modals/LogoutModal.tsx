import ModalStyle from "./ModalStyle.jsx";
import Notice from "../html/Notice.jsx";
import { Button } from "../ui/button.js";
import { useAuth } from "@/hooks/useAuth";
import { DialogClose, DialogContent, DialogTitle } from "../ui/dialog.js";

const LogoutModal = () => {

  const { logout, isLoggingOut } = useAuth();

  return (
    <DialogContent>
      <div className="flex  flex-col items-center gap-6">
        <DialogTitle className="text-sm ">Are you sure you want to log out?</DialogTitle>
        <div>
          <div className="flex items-center justify-end gap-2">
            <DialogClose className="px-5 py-2">
              Cancel
            </DialogClose>
            <Button onClick={() => logout()} disabled={isLoggingOut}>
              <p className="text-red-500">Yes, Log me out</p>
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default LogoutModal;
