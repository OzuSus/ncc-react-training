import { axiosInstance } from '@/app-core/axiosInstance.ts';

export async function fetchUserConfigPermission() {
  const { data } = await axiosInstance.get('/AbpUserConfiguration/GetAll');

  return data;
}
