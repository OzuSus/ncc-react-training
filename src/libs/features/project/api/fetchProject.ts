import { httpRequest } from '@/app-core/axiosInstance';
import {
  IProjectResponse,
  IProjectsRequest,
} from '@/libs/features/project/hooks/useProjectQuery';

export async function fetchProjectApi({
  status,
  search = '',
}: IProjectsRequest = {}) {
  return httpRequest.get<IProjectResponse[]>(
    'api/services/app/Project/getAll',
    {
      params: { search, ...(status !== undefined && { status }) },
    },
  );
}
