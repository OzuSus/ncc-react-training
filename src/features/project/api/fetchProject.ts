import { httpRequest } from '@/app-core/axiosInstance';
import {
  IProjectResponse,
  IProjectsRequest,
} from '@/features/project/hooks/useProjectQuery';

export async function fetchProjectApi({
  status = 0,
  search = '',
}: IProjectsRequest = {}) {
  return httpRequest.get<IProjectResponse[]>(
    'api/services/app/Project/getAll',
    {
      params: { status, search },
    },
  );
}
