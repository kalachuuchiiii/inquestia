import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
const useLogin = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [form, setForm] = useState({
    username: '', 
    password: ''
  })
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const nav = useNavigate();
  
  const login = async() => {
    setIsLoginLoading(true)
    try{
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, {
        user: {
          ...form
        }, 
      }, { withCredentials: true})
      if(res?.data?.user){
        setIsAuthenticated(true);
        nav("/home")
      }
      console.log(res);
    }catch(e){
      setLoginError(e?.response?.data?.message || "Internal Server Error");
      console.log(e);
    }finally{
      setIsLoginLoading(false);
    }
  }
  
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
  loginError
}

}

export default useLogin