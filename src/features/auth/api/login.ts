import { axiosInstance } from '@/app-core/axiosInstance.ts';

export type TAuthBody = {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
};
export async function loginApi(body: TAuthBody) {
  const { data } = await axiosInstance.post(
    '/api/TokenAuth/Authenticate',
    body,
  );
  return data;
}
