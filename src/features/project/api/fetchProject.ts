import { httpRequest } from '@/app-core/axiosInstance';
import {
  IProjectResponse,
  IProjectsRequest,
} from '@/features/project/hooks/useProjectQuery';
import { ProjectStatus } from '@/features/project/types.ts';

export async function fetchProjectApi({
  status = ProjectStatus.Active,
  search = '',
}: IProjectsRequest = {}) {
  return httpRequest.get<IProjectResponse[]>(
    'api/services/app/Project/getAll',
    {
      params: { status, search },
    },
  );
}
