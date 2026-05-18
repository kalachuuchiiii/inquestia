import axios, { type AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

//""

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    try {
      const originalResponse = error?.config;
      const response = error?.response;
      if (!response || !originalResponse) {
        return Promise.reject(error);
      }

      const hasRetried = (originalResponse as any)._retry;
      const hasRefreshed = originalResponse.url?.includes("/auth/refresh");
      const isUnauthorized = response?.status === 401;

      if (hasRetried || (hasRefreshed && isUnauthorized)) {
        return Promise.reject(error);
      }

      const { data } = await api.post<{
        success: boolean;
        accessToken: string;
      }>("/api/auth/refresh");

      const isRefreshSuccess = data.success && data.accessToken;

      if (isRefreshSuccess) {
        api.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;
        (originalResponse as any)._retry = true;
        return api(originalResponse);
      }
      return Promise.reject(error);
    } catch (e: any) {
      return Promise.reject(e);
    }
  }
);

export default api;
