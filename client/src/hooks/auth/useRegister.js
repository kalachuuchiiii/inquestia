import { useEffect, useState } from 'react';
import axios from 'axios';
import useAsync from '../useAsync.js';

const useRegister = () => {
  const [form, setForm] = useState({
    email: '', 
    username: '', 
    password: ''
  })
  const [code, setCode] = useState(0);
  
  const [register, {
    isLoading: isRegisterLoading, 
    isSuccess: isRegistered,
    error: registerError, 
    resetState: resetRegisterState
  }] = useAsync(async(code) => {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/register`, {
        user: {
          ...form
        }, 
        code: code.toString()
      });
  })
  
  const [sendCode, {
    isLoading: isCodeSendingLoading, 
    isSuccess: isCodeSent,
    error: otpError, 
    resetSendCodeState
  }] = useAsync(async() => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/register/otp`, {
        user: {
          ...form
        }
      })  
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev, [name]: value
    }))
  }
  
  const onClose = () => {
    setCode(0); 
    resetSendCodeState();
    resetRegisterState();
  }
  
  useEffect(() => {
    if(!isRegistered)return;
    window.location.href = "/login";
  }, [isRegistered])
  
  
  
  return { form, handleChange, isCodeSent, sendCode, register, isRegisterLoading, isCodeSendingLoading, registerError, otpError, onClose, isRegistered };


}

export default useRegister