import { httpRequest } from '@/app-core/axiosInstance';

export async function inactiveProjectApi(id: number) {
  return httpRequest.post(`api/services/app/Project/Inactive`, { id });
}
