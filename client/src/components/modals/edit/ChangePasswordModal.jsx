import ModalStyle from '../ModalStyle.jsx';
import { useSelector} from 'react-redux';
import Button from '../../html/Button.jsx';
import useAsync from '../../../hooks/useAsync.js';
import useInterval from '../../../hooks/useInterval.js';
import { useEffect, useState } from 'react';

import { fetchApi } from '../../../utils/fetchApi.js';

const ResendButton = ({ requestToken = () => {}, isLoading = false, timer = 60, setTimer = () => {}, isSuccess = false}) => {
  
  
  useInterval({ fn: () => setTimer(prev => prev === 0 ? prev : prev - 1), }, []);
  
  const handleResend = async() => {
    if(timer > 0)return;
    await requestToken({ isResend: true});
    setTimer(60);
  }
  
  return (
    <>
      <Button
        className="w-full p-2 bg-zinc-700 rounded-lg text-neutral-100"
        disabled={!isSuccess || isLoading || timer > 0}
        onClick={handleResend}
      >
        Resend {timer}
      </Button>
    </>
  );
}
const ChangePasswordModal = ({ onClose = () => {}}) => {
  const { user } = useSelector(state => state.user);
  const [timer, setTimer] = useState(60);
  
  const [requestToken, { isLoading, error, isSuccess }] = useAsync(async({ isResend = false} = {}) => {
    if(isResend && !isSuccess && timer > 0)return;

    const res = await fetchApi("post", "/user/send-request-token-c-p");
    setTimer(60);
    return res
  })

return (
  <ModalStyle label="Change Password" onClose={onClose}>
    <div className="space-y-6">
      <div>
        <h1>Send password reset link to your email?</h1>
        <div className="text-sm opacity-80">
          <p>{user.email}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        {isSuccess && (
          <p className="text-xs text-blue-400">Successfully sent!</p>
        )}
        <Button
          disabled={isLoading || isSuccess || timer !== 60}
          onClick={requestToken}
        >
          Request
        </Button>
        {isSuccess && (
          <ResendButton
            isSuccess={isSuccess}
            timer={timer}
            setTimer={setTimer}
            requestToken={requestToken}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  </ModalStyle>
);
}

export default ChangePasswordModal