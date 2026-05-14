import { axiosInstance } from '@/app-core/axiosInstance.ts';

export async function fetchMeApi() {
  const { data } = await axiosInstance.get(
    '/api/services/app/Session/GetCurrentLoginInformations',
  );
  return data;
}
