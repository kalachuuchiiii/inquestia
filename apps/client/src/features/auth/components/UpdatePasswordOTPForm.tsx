import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { useUpdatePassword } from "../hooks/useUpdatePassword";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";

interface UpdatePasswordOTPFormProps {
  updatePasswordControl: ReturnType<typeof useUpdatePassword>;
}
export const UpdatePasswordOTPForm = ({
  updatePasswordControl,
}: UpdatePasswordOTPFormProps) => {
  const {
    timer,
    handleChangeCode,
    isRequestingPasswordUpdate,
    updatePasswordRequest,
    code,
    verifyUpdateRequestCode,
    isVerifyingCode,
    isCodeSent
  } = updatePasswordControl;
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Verify Email</DialogTitle>
        <DialogDescription>
         Request for password update
        </DialogDescription>
      </DialogHeader>
      <div className="w-full flex items-center justify-center">
        <InputOTP
          value={code}
          onChange={handleChangeCode}
          pattern={REGEXP_ONLY_DIGITS}
          disabled = {!isCodeSent}
          maxLength={6}
        >
          <InputOTPGroup >
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
            onClick={() => updatePasswordRequest()}
            disabled={timer > 0}
            className="w-4/12 "
          >
            {timer > 0 ? <p>{timer}s</p> : <p>Send code</p>}
          </Button>
          <Button
            onClick={() => verifyUpdateRequestCode(code)}
            disabled={isVerifyingCode || !code || code.length < 6}
            
            className="w-4/12 "
          >
            Verify
          </Button>
        </div>
      </footer>
    </DialogContent>
  );
};
