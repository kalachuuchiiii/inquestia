import ModalStyle from '../ModalStyle.jsx';
import { useSelector } from 'react-redux';
import Button from '../../html/Button.jsx';
import useAsync from '../../../hooks/useAsync.js';
import { fetchApi } from '../../../utils/fetchApi.js';
import { useState } from 'react';
import useInterval from '../../../hooks/useInterval.js';

const ResendButton = ({ requestToken = () => {}, isLoading = false, timer = 60, setTimer = () => {}, isSuccess = false}) => {
  
  
  useInterval(
    { fn: () => setTimer((prev) => (prev <= 0 ? null : prev - 1)) },
    []
  );
  
  const handleResend = async() => {
    if(timer > 0)return;
    await requestToken({ isResend: true});
    setTimer(60);
  }
  
  return <>
        <Button className = "w-full p-2 bg-zinc-700 rounded-lg text-neutral-100" disabled = {!isSuccess || isLoading || timer > 0} onClick = {handleResend}>Resend {timer}</Button>
  </>
}

const ForgotPasswordRequestModal = ({ onClose = () => { } }) => {
  const { user } = useSelector(state => state.user);
  const [email, setEmail] = useState(null);
  const [timer, setTimer] = useState(60);
  const [requestToken, { isLoading, error, isSuccess }] = useAsync(async ({ isResend = false} = {}) => {

    if(isResend && !isSuccess && timer > 0)return;


    const res = await fetchApi("post", "/user/send-request-token-f-p", {
      email
    });
   
    setTimer(60)
    return res;
  })

  return (
    <ModalStyle label="Forgot Password" onClose={onClose}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1>Enter your email to verify.</h1>
          <p className="text-xs opacity-70">
            You're requesting a secure token to update your password.
          </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            form="none"
            className="outline-none w-full p-2 rounded-lg bg-neutral-300 dark:bg-zinc-700"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          {isSuccess ? (
            <p className="text-xs text-blue-400">Successfully sent!</p>
          ) : (
            error && <p className="text-red-400 text-xs">{error}</p>
          )}
          <Button disabled={isLoading || isSuccess} onClick={requestToken}>
            Request{" "}
          </Button>
          {isSuccess && (
            <ResendButton
              isSuccess={isSuccess}
              requestToken={requestToken}
              timer={timer}
              isLoading={isLoading}
              setTimer={setTimer}
            />
          )}
        </div>
      </div>
    </ModalStyle>
  );
}

export default ForgotPasswordRequestModal