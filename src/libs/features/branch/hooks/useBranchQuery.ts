import { useQuery } from '@tanstack/react-query';
import { fetchBranchApi } from '@/libs/features/branch/api/fetchBranch';
import { IBranch } from '@/libs/features/branch/types';

export function useBranchQuery() {
  return useQuery<IBranch[]>({
    queryKey: ['branches'],
    queryFn: async () => {
      const data = await fetchBranchApi();
      return data.result || [];
    },
  });
}
