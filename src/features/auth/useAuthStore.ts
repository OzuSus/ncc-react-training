import { createAppStore } from '@/app-core/store-setup.ts';
import Cookies from 'js-cookie';
import { loginApi } from '@/features/auth/api/login.ts';
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
      set((state) => {
        state.user = { id: data?.result?.userId };
      });
    },
    fetchMe: async () => {
      const user = await fetchMeApi();
      set((state) => {
        state.user = user;
      });
      return user;
    },
  }),
  'user',
);
