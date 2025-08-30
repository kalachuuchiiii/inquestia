import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useAsync from '../useAsync.js';

const useLogin = () => {
  const [form, setForm] = useState({
    username: '', 
    password: ''
  })
  const nav = useNavigate();
  
  const [login, { isLoading, isSuccess, error }] = useAsync(async() => {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, {
        user: {
          ...form
        }, 
      }, { withCredentials: true});
  }, [form])
  
  
  useEffect(() => {
    if(isSuccess){
      nav("/home");
    }
  }, [isSuccess])
  
  
  
  
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setForm(prev => ({
      ...prev, [name]: value
    }))
  }

return { 
  login, 
  handleChange,
  form, 
  isLoginLoading: isLoading,
  loginError: error
}

}

export default useLogin