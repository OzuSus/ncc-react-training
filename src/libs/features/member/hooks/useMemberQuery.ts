import { useQuery } from '@tanstack/react-query';
import { fetchMemberApi } from '@/libs/features/member/api/fetchMember';
import { IMember } from '@/libs/features/member/types.ts';
import { mapMember } from '@/libs/features/member/mappers/memberMapper.ts';

export interface IMemberResponse {
  id: number;
  name: string;
  emailAddress: string;
  isActive: boolean;
  type: number;
  jobTitle: string | null;
  level: number | null;
  userCode: string | null;
  avatarPath: string;
  avatarFullPath: string;
  branch: number;
  branchDisplayName: string;
  branchId: number;
  branchColor: string;
  positionId: number;
  positionName: string;
}
export function useMemberQuery() {
  return useQuery<IMember[]>({
    queryKey: ['usersNotPaging'],
    queryFn: async () => {
      const data = await fetchMemberApi();
      return (data.result || []).map(mapMember);
    },
  });
}
