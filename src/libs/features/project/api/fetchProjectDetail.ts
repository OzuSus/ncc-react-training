import { httpRequest } from '@/app-core/axiosInstance';
import { IProjectDetailResponse } from '@/libs/features/project/hooks/useProjectDetailQuery.ts';

export async function fetchProjectDetailApi(projectId: number) {
  return httpRequest.get<IProjectDetailResponse>(
    `api/services/app/Project/Get?input=${projectId}`,
  );
}
