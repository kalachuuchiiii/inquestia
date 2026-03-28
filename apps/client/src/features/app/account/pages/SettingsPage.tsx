import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { changeTheme } from "@/state/slice/theme";
import type { AppDispatch, RootState } from "@/state/store";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
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
  ItemHeader,
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
import { Card } from "@/components/ui/card";
import { capitalize } from "lodash";

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  const { isDark } = useSelector((state: RootState) => state.theme);

  const handleThemeChange = (val: string) => dispatch(changeTheme(val));

  const { logout, isLoggingOut } = useAuth();

  return (
    <div className=" space-y-3 max-w-3xl mx-auto mt-20">
      {/* Theme */}
      <Item>
        <ItemContent>
          <ItemTitle>Theme</ItemTitle>
          <ItemDescription>Color of the interface/UI</ItemDescription>
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
            <SelectValue>{isDark ? 'Dark' : 'Light'}</SelectValue>
          </SelectTrigger>
        </Select>
      </Item>

      {/* Navigation */}
      <Link to="/boost-market">
        <Item>
          <ItemContent>
            <ItemTitle>
              <>Exchange Center</>
            </ItemTitle>
            <ItemDescription>Exchange your cores for resources</ItemDescription>
          </ItemContent>
          <ItemActions>
            {" "}
            <ChevronRight />{" "}
          </ItemActions>
        </Item>
      </Link>

      {/* Logout Dialog */}
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log-out?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Cancel</AlertDialogCancel>
            <Button
              variant={"destructive"}
              onClick={() => logout()}
              disabled={isLoggingOut}
            >
              Yes, log me out
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
        <AlertDialogTrigger asChild>
          <Item>
            <span className="text-red-500 font-semibold">Logout</span>
          </Item>
        </AlertDialogTrigger>
      </AlertDialog>
    </div>
  );
};

export default SettingsPage;
