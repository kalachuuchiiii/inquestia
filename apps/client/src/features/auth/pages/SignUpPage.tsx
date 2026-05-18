import useRegister from "@/features/auth/hooks/useRegister.js";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/features/auth/components/AuthLayout.js";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group.js";
import { MdEmail } from "react-icons/md";
import { Key, User } from "lucide-react";
import {
  PASSWORD_MAX,
  PASSWORD_MIN,
  USERNAME_MAX,
  USERNAME_MIN,
} from "@inquestia/constants";
import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.js";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp.js";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import inka from "/inka.gif";

const Register = () => {
  const {
    registerForm,
    register,
    handleChangeCode,
    isRegistering,
    code,
    isSendingCode,
    isCodeSent,
    handleToggleAcceptPP,
    timer,
    sendCode,
    handleChangeForm,
  } = useRegister();

  return (
    <AuthLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendCode();
        }}
        className="space-y-3 p-3"
      >
        <Dialog open={isCodeSent}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle> Verify Email</DialogTitle>
              <DialogDescription>
                A 6-Digit Verification Code has been sent to your inbox
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex items-center justify-center">
              <InputOTP
                value={code}
                onChange={handleChangeCode}
                pattern={REGEXP_ONLY_DIGITS}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-14" />
                  <InputOTPSlot index={1} className="size-14" />
                  <InputOTPSlot index={2} className="size-14" />
                  <InputOTPSlot index={3} className="size-14" />
                  <InputOTPSlot index={4} className="size-14" />
                  <InputOTPSlot index={5} className="size-14" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <footer>
              <div className="w-full gap-2  flex items-center justify-end">
                <Button
                  variant={"outline"}
                  onClick={() => sendCode()}
                  disabled={timer > 0}
                  className="w-4/12 "
                >
                  {timer > 0 ? <p>{timer}s</p> : <p>Resend code</p>}
                </Button>
                <Button
                  onClick={() => register()}
                  disabled={isRegistering}
                  className="w-4/12 "
                >
                  Verify
                </Button>
              </div>
            </footer>
          </DialogContent>
        </Dialog>
        <header className="my-2 text-center flex flex-col items-center">
          <img src={inka} className="size-8" />
          <p className="text-2xl ">Register at</p>
          <p className="text-5xl font-bold">Inquestia</p>
        </header>
        <div className="flex w-full  flex-col">
          <label className="text-sm">Username</label>
          <div className="p-1 rounded flex w-full justify-between text-base  sm:text-[14px] text- items-center">
            <InputGroup>
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="johndoe"
                type="text"
                required
                maxLength={USERNAME_MAX}
                className="w-full outline-none p-1 rounded"
                name="username"
                onChange={handleChangeForm}
                value={registerForm.username}
              />
            </InputGroup>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className=" text-sm">Email</label>
          <div>
            <InputGroup>
              <InputGroupAddon>
                <MdEmail />
              </InputGroupAddon>
              <InputGroupInput
                required
                type="email"
                className="p-1 text-base sm:text-[14px] rounded outline-none"
                name="email"
                placeholder="johndoe@gmail.com"
                onChange={handleChangeForm}
                value={registerForm.email}
              />
            </InputGroup>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <label className="text-sm">Password</label>
          <div className="p-1 rounded flex w-full justify-between text-base  sm:text-[14px] text- items-center">
            <InputGroup>
              <InputGroupAddon>
                <Key />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="**********"
                type="password"
                required
                maxLength={PASSWORD_MAX}
                className="w-full outline-none p-1 rounded"
                name="password"
                onChange={handleChangeForm}
                value={registerForm.password}
              />
            </InputGroup>
          </div>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  className="size-5"
                  checked={registerForm.hasAcceptedPrivacyPolicy}
                />
                <p className="text-xs italic text-blue-400 underline cursor-pointer ">
                  I agree to the Privacy Policy
                </p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Privacy Policy</DialogTitle>
                <DialogDescription>Inquestia</DialogDescription>
              </DialogHeader>
              <main className="w-10/12 border-l-1  italic border-l-black/80 pl-4 text-justify">
                Your email is never shared with third-party libraries and is not
                exposed on the client side to other users; however, survey
                authors may share collected responses in any manner they choose,
                and you may choose to answer surveys anonymously or with your
                identity.
              </main>
              <DialogFooter>
                <div className="w-full flex justify-start my-4 ">
                  <div className="flex items-center w-full justify-start  gap-2 ">
                    <Input
                      checked={registerForm.hasAcceptedPrivacyPolicy}
                      onChange={handleToggleAcceptPP}
                      type="checkbox"
                      className="size-5"
                    />
                    <p className="w-full truncate text-sm ">
                      I agree to the Privacy Policy
                    </p>
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <footer className="flex flex-col w-full gap-2 my-4">
          <Button
            disabled={isSendingCode || isCodeSent}
            type="submit"
            className="btn w-fit"
          >
            Register
          </Button>
          <div className="text-xs  cursor-pointer ">
            <p className=" space-x-1">
              Already have an account?{" "}
              <NavLink
                to="/sign-in"
                className={"text-blue-400 hover:underline"}
              >
                Sign In
              </NavLink>
            </p>
          </div>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default Register;
