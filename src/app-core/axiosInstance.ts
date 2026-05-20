import axios, { AxiosRequestConfig } from 'axios';
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
  get: async <T, S extends boolean = false>(
    url: string,
    config?: AxiosRequestConfig & { special?: S },
  ): Promise<S extends true ? T : IHttpResponse<T>> => {
    const { special, ...axiosConfig } = config || {};
    const response = await axiosInstance.get(url, axiosConfig);
    if (special) {
      return response.data as T;
    } else {
      return response.data as IHttpResponse<T>;
    }
  },
};
