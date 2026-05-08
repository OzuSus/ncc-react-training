import { createAppStore } from '@/app-core/store-setup.ts';

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
  }),
  'user',
);
