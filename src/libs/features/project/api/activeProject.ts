import { httpRequest } from '@/app-core/axiosInstance';

export async function activeProjectApi(id: number) {
  return httpRequest.post(`api/services/app/Project/Active`, { id });
}
