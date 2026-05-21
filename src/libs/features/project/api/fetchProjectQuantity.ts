import { httpRequest } from '@/app-core/axiosInstance.ts';
import { IProjectQuantity } from '@/libs/features/project/types.ts';

export async function fetchProjectQuantityApi() {
  return httpRequest.get<IProjectQuantity[]>(
    'api/services/app/Project/GetQuantityProject',
  );
}
