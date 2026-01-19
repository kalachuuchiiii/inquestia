

import { useState } from 'react';
import useInterval from '../../hooks/useInterval.js';
import ModalStyle from './ModalStyle.jsx';
import { Button } from '../ui/button.js';

const VerifyEmailModal = ({ email = "juandelacruz@___", resend = () => { }, register = () => { }, isRegisterLoading = false, registerError = '', isCodeSendingLoading = false, isRegistered = false, otpError = '', onClose = () => { } }) => {

  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState(0);
  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    resend();
  }

  useInterval({ fn: () => setTimer(prev => prev === 0 ? prev : prev - 1), }, []);

  return (
    <ModalStyle onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <p>
            A verification code was sent to <strong>{email}</strong>.
          </p>
          <input
            value={code || null}
            onChange={({ target: { value } }) => setCode(value)}
            placeholder="Code here"
            required
            type="number"
            className="p-2 outline-none w-full border-b-1 white"
            minLength={6}
            maxLength={6}
          />
        </div>
        <div className="flex flex-col justify-start w-8/12 gap-3 items-start">
          <Button
            disabled={code.toString()?.length !== 6 || isRegisterLoading}
            onClick={() => register(code)}
           
            className="dark:bg-neutral-100 dark:text-zinc-950  rounded-lg w-24 bg-zinc-950 text-neutral-100 px-6 py-1 active:bg-transparent active:text-white"
          >
            Verify
          </Button>
          <div className="flex gap-2 items-center text-sm">
            <Button
              onClick={handleResend}
              disabled={timer > 0 || isRegisterLoading || isCodeSendingLoading}
            
              className={` py-1 ${timer > 0 && " opacity-50 "} `}
            >
              {" "}
              Resend code
            </Button>
            <p className="opacity-50">{timer <= 0 ? null : timer}</p>
          </div>
        </div>
        <p className="text-xs text-red-400 h-4">
          {otpError ? otpError : registerError && registerError}
        </p>
      </div>
    </ModalStyle>
  );
}

export default VerifyEmailModal