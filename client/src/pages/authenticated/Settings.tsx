

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { changeTheme } from "../../state/slice/theme";
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
import { useAuth } from "@/hooks/useAuth";
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

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  const { mode } = useSelector((state: RootState) => state.theme);

  const handleThemeChange = (val: string) => dispatch(changeTheme(val));

  const { logout, isLoggingOut } = useAuth();

  return (
    <div className=" space-y-3 max-w-3xl mx-auto mt-20">
      {/* Theme */}
      <Item >
        <ItemContent>
          <ItemTitle >Theme</ItemTitle>
          <ItemDescription>Dark mode</ItemDescription>
        </ItemContent>

        <Select value={mode} onValueChange={handleThemeChange}>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Theme</SelectLabel>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
            </SelectGroup>
          </SelectContent>
          <SelectTrigger>
            <SelectValue>{mode}</SelectValue>
          </SelectTrigger>
        </Select>
      </Item>

      {/* Navigation */}
      <Link  to="/exchange-center">
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
      </Item></Link>
     <Link to="/transactions">
       <Item>
        <ItemContent>
          <ItemTitle>
            Transactions
          </ItemTitle>
          <ItemDescription>Monitor your exchange transactions</ItemDescription>
        </ItemContent>
        <ItemActions>
          {" "}
          <ChevronRight />{" "}
        </ItemActions>
      </Item>
     </Link>

     <Link to="/cs"> 
      <Item>
        <ItemContent>
          <ItemTitle>
            <>Feedback</>
          </ItemTitle>
          <ItemDescription>Send a feedback</ItemDescription>
        </ItemContent>
        <ItemActions>
          {" "}
          <ChevronRight />{" "}
        </ItemActions>
      </Item></Link>

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

export default SettingsPage