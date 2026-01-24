import axios from "axios";


export const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
})

API.interceptors.response.use((res) => {
    console.log(res.config.url, res.data);
    return res;
})
