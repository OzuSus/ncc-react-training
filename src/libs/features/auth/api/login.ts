import { axiosInstance } from '@/app-core/axiosInstance.ts';

export interface IAuthBody {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}
export async function loginApi(body: IAuthBody) {
  const { data } = await axiosInstance.post(
    '/api/TokenAuth/Authenticate',
    body,
  );
  return data;
}
