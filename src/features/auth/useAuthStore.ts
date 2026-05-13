import { createAppStore } from '@/app-core/store-setup.ts';
import Cookies from 'js-cookie';
import { loginApi, TAuthBody } from '@/features/auth/api/login.ts';
import { fetchMeApi } from '@/features/auth/api/fetchMe.ts';
export interface IUser {
  id: number;
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  allowedLeaveDay: number;
  type: string | null;
  level: number;
  sex: string | null;
  branch: string | null;
  avatarPath: string;
  avatarFullPath: string;
  morningWorking: string;
  morningStartAt: string;
  morningEndAt: string;
  afternoonWorking: string;
  afternoonStartAt: string;
  afternoonEndAt: string;
  isWorkingTimeDefault: boolean;
  branchId: number;
}

interface IAuthState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (body: TAuthBody) => Promise<void>;
  fetchMe: () => Promise<IUser>;
  logout: () => void;
}

const initialState: IAuthState = {
  user: null,
};

export const useAuthStore = createAppStore<IAuthState>(
  (set) => ({
    ...initialState,
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
    logout: () => {
      Cookies.remove('accessToken');
      Cookies.remove('encryptedAccessToken');
      set((state) => {
        state.user = null;
      });
    },
    login: async (body) => {
      const data = await loginApi(body);
      if (!data?.success) {
        throw new Error(data?.error?.message || 'Login failed');
      }
      const accessToken = data?.result?.accessToken;
      const encryptedAccessToken = data?.result?.encryptedAccessToken;
      const secure = window.location.protocol === 'https';
      const expireInSeconds = data?.result?.expireInSeconds;
      Cookies.set('accessToken', accessToken, {
        sameSite: 'strict',
        secure,
        expires: expireInSeconds / 60 / 60 / 24,
      });
      Cookies.set('encryptedAccessToken', encryptedAccessToken, {
        sameSite: 'strict',
        secure,
        expires: expireInSeconds / 60 / 60 / 24,
      });

      set((state) => {
        state.user = { id: data?.result?.userId };
      });
    },
    fetchMe: async () => {
      const user = await fetchMeApi();
      set((state) => {
        state.user = user.result.user;
      });
      return user;
    },
  }),
  'user',
);
