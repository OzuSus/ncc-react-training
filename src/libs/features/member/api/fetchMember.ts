import { httpRequest } from '@/app-core/axiosInstance';
import { IMember } from '@/libs/features/member/types';

export async function fetchMemberApi() {
  return httpRequest.get<IMember[]>('api/services/app/User/GetUserNotPagging');
}
