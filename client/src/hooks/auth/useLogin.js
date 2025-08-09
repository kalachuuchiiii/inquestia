import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useAsync from '../useAsync.js';

const useLogin = () => {
  
  const [login, { isLoading, isSuccess, error }] = useAsync(async() => {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, {
        user: {
          ...form
        }, 
      }, { withCredentials: true});
  })
  
  
  useEffect(() => {
    if(isSuccess){
      window.location.href = "/home";
    }
  }, [isSuccess])
  
  
  const [form, setForm] = useState({
    username: '', 
    password: ''
  })
  
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
  loginError: error
}

}

export default useLogin