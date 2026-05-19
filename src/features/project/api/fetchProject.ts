import { axiosInstance } from '@/app-core/axiosInstance.ts';
import {
  IProjectResponse,
  IProjectsRequest,
} from '@/features/project/hooks/useProjectQuery.ts';

export async function fetchProjectApi({
  status = 0,
  search = '',
}: IProjectsRequest = {}): Promise<IProjectResponse> {
  const { data } = await axiosInstance.get<IProjectResponse>(
    'api/services/app/Project/getAll',
    {
      params: { status, search },
    },
  );

  return data;
}
