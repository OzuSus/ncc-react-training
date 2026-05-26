import { useQuery } from '@tanstack/react-query';
import { fetchMemberApi } from '@/libs/features/member/api/fetchMember';
import { IMember } from '@/libs/features/member/types.ts';

export function useMemberQuery() {
  return useQuery<IMember[]>({
    queryKey: ['usersNotPaging'],
    queryFn: async () => {
      const data = await fetchMemberApi();
      return data.result || [];
    },
  });
}
