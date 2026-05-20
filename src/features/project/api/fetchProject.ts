import { axiosInstance } from '@/app-core/axiosInstance';
import { IHttpResponse } from '@/app-core/@types/http';
import {
  IProjectResponse,
  IProjectsRequest,
} from '@/features/project/hooks/useProjectQuery';

export async function fetchProjectApi({
  status = 0,
  search = '',
}: IProjectsRequest = {}): Promise<IHttpResponse<IProjectResponse[]>> {
  const { data } = await axiosInstance.get<IHttpResponse<IProjectResponse[]>>(
    'api/services/app/Project/getAll',
    {
      params: { status, search },
    },
  );

  return data;
}
