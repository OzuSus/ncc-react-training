import { useQuery } from '@tanstack/react-query';
import { fetchBranchApi } from '@/libs/features/branch/api/fetchBranch';
import { IBranch } from '@/libs/features/branch/types';
import { mapBranch } from '@/libs/features/branch/mappers/branchMapper.ts';

export interface IBranchResponse {
  id: number;
  name: string;
  code: string;
}
export function useBranchQuery() {
  return useQuery<IBranch[]>({
    queryKey: ['branches'],
    queryFn: async () => {
      const data = await fetchBranchApi();
      return (data.result || []).map(mapBranch);
    },
  });
}
