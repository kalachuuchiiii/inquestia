import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import useAsync from '../useAsync.js';
import { getSession } from '../../state/slice/user.js';

const useLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const nav = useNavigate();

  const [login, { isLoading, isSuccess, error }] = useAsync(async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
      {
        user: {
          ...form,
        },
      },
      { withCredentials: true }
    );
    if (res?.data?.success) {
      await dispatch(getSession());
      nav("/home");
    }
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    login,
    handleChange,
    form,
    isLoginLoading: isLoading,
    loginError: error,
  };
}

export default useLogin