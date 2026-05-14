import { createAppStore } from '@/app-core/store-setup.ts';
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

interface IAuthState {
  user: IUser | null;
  permissions: string[];
  setUser: (user: IUser, permissions: string[]) => void;
  logout: () => void;
}

const initialState: IAuthState = {
  user: null,
  permissions: [],
};

export const useAuthStore = createAppStore<IAuthState>(
  (set) => ({
    ...initialState,
    setUser: (user, permissions) =>
      set((state) => {
        state.user = user;
        state.permissions = permissions;
      }),
    logout: () => {
      Cookies.remove('accessToken');
      Cookies.remove('encryptedAccessToken');
      set((state) => {
        state.user = null;
        state.permissions = [];
      });
    },
  }),
  'user',
);
