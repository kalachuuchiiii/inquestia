import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import { API } from "@/lib/axios.instance";
import { useDispatch } from "react-redux";
import { renewAccessToken } from "@/state/slice/user";

export const useApi = () => {
  const { accessToken } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const requestInterceptorId = API.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    const responseInterceptorId = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.data.code !== "EXPIRED_TOKdEN")
          return Promise.reject(error);

        const config = error.config;
        const refresh = await API.post("/api/auth/refresh");
        if (refresh.data.success) {
          await dispatch(renewAccessToken(refresh.data.accessToken));
          config.headers.Authorization = `Bearer ${refresh.data.accessToken}`;
          return API(config);
        }
  
      }
    );

    return () => {
      API.interceptors.request.eject(requestInterceptorId);
      API.interceptors.response.eject(responseInterceptorId);
    };
  }, [accessToken]);

  return API;
};
