import { httpRequest } from '@/app-core/axiosInstance';
import { ITaskResponse } from '@/libs/features/task/hooks/useTaskQuery.ts';

export async function fetchTaskApi() {
  return httpRequest.get<ITaskResponse[]>('api/services/app/Task/GetAll');
}
