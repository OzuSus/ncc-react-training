import { httpRequest } from '@/app-core/axiosInstance.ts';
import { IClient } from '@/libs/features/client/types.ts';

export interface ICreateClientRequest {
  name: string;
  code: string;
  address?: string;
}

export async function createClientApi(body: ICreateClientRequest) {
  return httpRequest.post<IClient>('api/services/app/Customer/Save', body);
}
