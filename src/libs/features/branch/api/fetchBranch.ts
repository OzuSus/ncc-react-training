import { httpRequest } from '@/app-core/axiosInstance';
import { IBranch } from '@/libs/features/branch/types';

export async function fetchBranchApi(isAll: boolean = true) {
  return httpRequest.get<IBranch[]>(
    'api/services/app/Branch/GetAllBranchFilter',
    { params: { isAll } },
  );
}
