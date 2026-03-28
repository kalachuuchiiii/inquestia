import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const refreshAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

//""

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalResponse = error?.config;
    try {
      const response = error?.response;
      const hasRetried = originalResponse._retry;
      const isTokenInvalid =
        response?.data?.code === "EXPIRED_TOKEN" ||
        response?.data?.code === "INVALID_TOKEN";

      if (hasRetried || !isTokenInvalid) {
        return Promise.reject(error);
      }

      const { data } = await refreshAPI.post<{
        success: boolean;
        accessToken: string;
      }>("/api/auth/refresh");

      const isRefreshSuccess = data.success && data.accessToken;

      if (isRefreshSuccess) {
        api.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;
        originalResponse._retry = true;
        return api(originalResponse);
      }
      return Promise.reject(error);
    } catch (e: any) {
      console.log("err", e.response);
      return Promise.reject(e);
    }
  }
);

export default api;
