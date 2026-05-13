import { axiosInstance } from '@/app-core/axiosInstance.ts';
import Cookies from 'js-cookie';

export type TAuthBody = {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
};
export async function loginApi(body: TAuthBody) {
  const { data } = await axiosInstance.post('/TokenAuth/Authenticate', body);

  if (!data?.success) {
    throw new Error(data?.error?.message || 'Login failed');
  }
  const accessToken = data?.result?.accessToken;
  const encryptedAccessToken = data?.result?.encryptedAccessToken;
  const secure = window.location.protocol === 'https';
  const expireInSecond = data.result.expireInSeconds;
  Cookies.set('accessToken', accessToken, {
    sameSite: 'strict',
    secure,
    expires: expireInSecond / 60 / 60 / 24,
  });
  Cookies.set('encryptedAccessToken', encryptedAccessToken, {
    sameSite: 'strict',
    secure,
    expires: expireInSecond / 60 / 60 / 24,
  });
}
