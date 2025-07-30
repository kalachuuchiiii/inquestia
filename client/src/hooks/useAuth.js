import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const useForm = () => {
  const [form, setForm] = useState({
    email: '', 
    username: '', 
    password: ''
  })
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isCodeSendingLoading, setIsCodeSendingLoading] = useState(false);
  const nav = useNavigate();
  const [code, setCode] = useState([0,0,0,0,0,0]);
  const [otpError, setOtpError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev, [name]: value
    }))
  }
  
  const onClose = () => {
    setCode(0); 
    setIsCodeSendingLoading(false);
    setIsCodeSent(false);
    setRegisterError('');
    setOtpError('');
    setIsRegisterLoading(false);
  }
  
  const sendCode = async() => {
    setIsCodeSendingLoading(true);
    try{
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/register/otp`, {
        user: {
          ...form
        }
      });
      console.log(res);
      if(res?.data?.sent){
        setIsCodeSent(true);
        setOtpError("");
      }
    }catch(e){
      setOtpError(e?.response?.data?.message || "Internal Server Error");
      console.log(e);
    }finally{
      setIsCodeSendingLoading(false);
    }
  }
  
  const register = async(code) => {
    setIsRegisterLoading(true);
    try{
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/register`, {
        user: {
          ...form
        }, 
        code: parseInt(code)
      })
      if(res?.data?.user){
        setIsRegistered(true);
        nav("/home");
      }
      
    }catch(e){
      setRegisterError(e?.response?.data?.message || "Internal Server Error.");
      console.log(e);
    }finally{
      setIsRegisterLoading(false);
      setIsCodeSendingLoading(false);
      setOtpError('');
    }
  }
  
  return { form, handleChange, isCodeSent, sendCode, register, isRegisterLoading, isCodeSendingLoading, registerError, otpError, onClose, isRegistered };


}

export default useForm