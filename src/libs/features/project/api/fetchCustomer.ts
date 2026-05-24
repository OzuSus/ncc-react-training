import { httpRequest } from '@/app-core/axiosInstance';
import { ICustomer } from '@/libs/features/project/types';

export async function fetchCustomerApi() {
  return httpRequest.get<ICustomer[]>('api/services/app/Customer/GetAll');
}
