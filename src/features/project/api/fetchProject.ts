import { axiosInstance } from '@/app-core/axiosInstance.ts';

export async function fetchProjectApi(status = 0, search = '') {
  const { data } = await axiosInstance.get('api/services/app/Project/getAll', {
    params: { status, search },
  });

  return data;
}
