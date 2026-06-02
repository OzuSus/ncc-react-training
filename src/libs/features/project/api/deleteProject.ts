import { httpRequest } from '@/app-core/axiosInstance';

export async function deleteProjectApi(id: number) {
  return httpRequest.delete(`api/services/app/Project/Delete?Id=${id}`);
}
