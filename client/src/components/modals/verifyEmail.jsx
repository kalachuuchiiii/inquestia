

import { useState } from 'react';
import useInterval from '../../hooks/useInterval.js';
import ModalStyle from './ModalStyle.jsx';
import Button from '../html/Button.jsx';

const VerifyEmailModal = ({ email = "juandelacruz@___", resend = () => { }, register = () => { }, isRegisterLoading = false, registerError = '', isCodeSendingLoading = false, isRegistered = false, otpError = '', onClose = () => { } }) => {

  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState(0);
  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    resend();
  }

  useInterval({ fn: () => setTimer(prev => prev === 0 ? prev : prev - 1), }, []);

  return <ModalStyle onClose={onClose}>
    <div>
      <p>A verification code was sent to <strong>{email}</strong>.</p>
      <input value={code || null} onChange={({ target: { value } }) => setCode(value)} placeholder="Code here" required type="number" className="p-2 outline-none border-b-1 border-b-1 white" minLength={6} maxLength={6} />
    </div>
    <div className="flex flex-col w-8/12 gap-3 items-start">
      <Button disabled = {code.toString().length !== 6 || isRegisterLoading} onClick={() => register(code)} loadingState = {isRegisterLoading}  className="bg-white rounded-lg w-24 text-black px-6 py-1 active:bg-transparent active:text-white">Verify</Button>
      <div className="flex gap-2 items-center text-sm">
        <Button onClick={handleResend} disabled = {timer > 0 || isRegisterLoading || isCodeSendingLoading} loadingState = {isCodeSendingLoading}  className={` py-1 ${timer > 0 && " opacity-50 "} `}> Resend code</Button>
        <p className="opacity-50">{timer <= 0 ? null : timer}</p>
      </div>
    </div>
    <p className="text-xs text-red-400 h-4">{otpError ? otpError : registerError && registerError
    }</p>
  </ModalStyle>
}

export default VerifyEmailModal