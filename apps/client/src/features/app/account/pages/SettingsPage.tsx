import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeTheme } from "@/state/slice/theme";
import type { AppDispatch, RootState } from "@/state/store";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDark } = useSelector((state: RootState) => state.theme);
  const handleThemeChange = (val: string) => dispatch(changeTheme(val));
  const { logout, isLoggingOut } = useAuth();

  return (
    <div className="">
      <header className="mb-6">
        <h1 className="text-3xl tracking-tighter font-bold">Settings</h1>
        <p className="opacity-75">Options for your account</p>
      </header>
      <Item>
        <ItemContent>
          <ItemTitle className="text-lg tracking-tighter font-semibold">
            Theme
          </ItemTitle>
          <ItemDescription className="text-base">
            Color of the interface/UI
          </ItemDescription>
        </ItemContent>

        <Select value={String(isDark)} onValueChange={handleThemeChange}>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Theme</SelectLabel>
              <SelectItem value="false">Light</SelectItem>
              <SelectItem value="true">Dark</SelectItem>
            </SelectGroup>
          </SelectContent>
          <SelectTrigger>
            <SelectValue>{isDark ? "Dark" : "Light"}</SelectValue>
          </SelectTrigger>
        </Select>
      </Item>

      {/* Navigation */}

      <Item>
        <ItemContent>
          <ItemTitle className="text-lg font-semibold tracking-tighter">
            <>Exchange Center</>
          </ItemTitle>
          <ItemDescription className="text-base ">
            Exchange your cores for resources
          </ItemDescription>
        </ItemContent>
        <Link to="/boost-market">
          <ItemActions>
            <Button variant={"outline"}>
              Purchase boosts <ChevronRight />
            </Button>
          </ItemActions>
        </Link>
      </Item>

      <Item>
        <ItemContent>
          <ItemTitle className="text-lg font-semibold tracking-tighter">
            <>Sign out</>
          </ItemTitle>
          <ItemDescription className="text-base ">
            Log out your account
          </ItemDescription>
        </ItemContent>

        <ItemActions>
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to sign-out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You'll need to sign in again
                </AlertDialogDescription>
              </AlertDialogHeader>
              <main className="flex items-center gap-2 justify-end">
                <AlertDialogCancel>No, Cancel</AlertDialogCancel>
                <Button
                  variant={"destructive"}
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                >
                  Yes, sign me out
                </Button>
              </main>
            </AlertDialogContent>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>
                <span>Sign Out</span>
              </Button>
            </AlertDialogTrigger>
          </AlertDialog>
        </ItemActions>
      </Item>
    </div>
  );
};

export default SettingsPage;
