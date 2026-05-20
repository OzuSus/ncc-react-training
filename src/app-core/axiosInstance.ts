import axios from 'axios';
import Cookies from 'js-cookie';
import { IHttpResponse } from '@/app-core/@types/http';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const httpRequest = {
  get: async <T>(
    url: string,
    config?: Parameters<typeof axiosInstance.get>[1],
  ): Promise<IHttpResponse<T>> => {
    const { data } = await axiosInstance.get<IHttpResponse<T>>(url, config);
    return data;
  },
};
