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

/**
 *   HttpRequest function normalizes API responses and supports both
 *   standard IHttpResponse wrapped responses and custom T responses.
 * 1. default (standard API)
 *    - Assumes response follows IHttpResponse<T> structure
 *    - Config with default special = false
 *    - Wrap data into IHttpResponse
 *    Usage: const data = await httpRequest.get<User>('/users/1')
 *    // data: IHttpResponse<User>
 *
 * 2. special (different API response from IHttpResponse)
 *    - Used when API response does not follow IHttpResponse structure
 *    - Config with special = true
 *    - Returns response type T directly
 *    Usage example:
 *    const data = await httpRequest.get<User>('/users/1', { special: true })
 *    // data: User
 **/
export const httpRequest = {
  get: async <T, S extends boolean = false>(
    url: string,
    config?: AxiosRequestConfig & { special?: S },
  ): Promise<S extends true ? T : IHttpResponse<T>> => {
    const { special, ...axiosConfig } = config || {};
    const response = await axiosInstance.get(url, axiosConfig);
    if (special) {
      return response.data as S extends true ? T : IHttpResponse<T>;
    }

    return response.data as S extends true ? T : IHttpResponse<T>;
  },

  post: async <T, S extends boolean = false>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig & { special?: S },
  ): Promise<S extends true ? T : IHttpResponse<T>> => {
    const { special, ...axiosConfig } = config || {};
    const response = await axiosInstance.post(url, data, axiosConfig);
    if (special) {
      return response.data as S extends true ? T : IHttpResponse<T>;
    }

    return response.data as S extends true ? T : IHttpResponse<T>;
  },

  delete: async <T, S extends boolean = false>(
    url: string,
    config?: AxiosRequestConfig & { special?: S },
  ): Promise<S extends true ? T : IHttpResponse<T>> => {
    const { special, ...axiosConfig } = config || {};
    const response = await axiosInstance.delete(url, axiosConfig);
    return special ? response.data : response.data;
  },
};
