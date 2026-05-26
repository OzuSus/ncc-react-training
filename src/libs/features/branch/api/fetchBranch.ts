import { httpRequest } from '@/app-core/axiosInstance';
import { IBranchResponse } from '@/libs/features/branch/hooks/useBranchQuery.ts';

export async function fetchBranchApi(isAll: boolean = true) {
  return httpRequest.get<IBranchResponse[]>(
    'api/services/app/Branch/GetAllBranchFilter',
    { params: { isAll } },
  );
}
