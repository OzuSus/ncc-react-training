import { axiosInstance } from '@/app-core/axiosInstance.ts';
import type { IUser } from '@/features/auth/useAuthStore.ts';

export async function fetchMeApi(): Promise<IUser> {
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
  return user;
}
