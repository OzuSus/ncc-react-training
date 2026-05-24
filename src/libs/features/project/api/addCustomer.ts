import { httpRequest } from '@/app-core/axiosInstance';
import { ICustomer } from '@/libs/features/project/types';

export interface IAddCustomerRequest {
  name: string;
  code: string;
  address?: string;
}

export async function addCustomerApi(body: IAddCustomerRequest) {
  return httpRequest.post<ICustomer>('api/services/app/Customer/Save', body);
}
