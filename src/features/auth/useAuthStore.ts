import { createAppStore } from '@/app-core/store-setup.ts';
import { axiosInstance } from '@/app-core/axiosInstance.ts';
import Cookies from 'js-cookie';
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

export type TAuthBody = {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
};
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
      const { data } = await axiosInstance.post<TAuthResponse>(
        '/TokenAuth/Authenticate',
        body,
      );
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
      set((state) => {
        state.user = { id: data.result.userId };
      });
    },
    fetchMe: async () => {
      const { data } = await axiosInstance.get(
        '/services/app/Session/GetCurrentLoginInformations',
      );
      if (!data?.success) {
        throw new Error(data?.error?.message || 'Get current user info failed');
      }
      const userInfo = data?.result?.user;
      const user: IUser = {
        id: userInfo.id,
        userName: userInfo.userName,
        name: userInfo.name,
        surname: userInfo.surname,
        emailAddress: userInfo.emailAddress,
        allowedLeaveDay: userInfo.allowedLeaveDay,
        type: userInfo.type,
        level: userInfo.level,
        sex: userInfo.sex,
        branch: userInfo.branch,
        avatarPath: userInfo.avatarPath,
        avatarFullPath: userInfo.avatarFullPath,
        morningWorking: userInfo.morningWorking,
        morningStartAt: userInfo.morningStartAt,
        morningEndAt: userInfo.morningEndAt,
        afternoonWorking: userInfo.afternoonWorking,
        afternoonStartAt: userInfo.afternoonStartAt,
        afternoonEndAt: userInfo.afternoonEndAt,
        isWorkingTimeDefault: userInfo.isWorkingTimeDefault,
        branchId: userInfo.branchId,
      };
      set((state) => {
        state.user = user;
      });
      return user;
    },
  }),
  'user',
);
