import { httpRequest } from '@/app-core/axiosInstance.ts';
import { IClient } from '@/libs/features/client/types.ts';

export async function fetchClientApi() {
  return httpRequest.get<IClient[]>('api/services/app/Customer/GetAll');
}
