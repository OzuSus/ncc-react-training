import { httpRequest } from '@/app-core/axiosInstance';
import { IMemberResponse } from '@/libs/features/member/hooks/useMemberQuery.ts';

export async function fetchMemberApi() {
  return httpRequest.get<IMemberResponse[]>(
    'api/services/app/User/GetUserNotPagging',
  );
}
