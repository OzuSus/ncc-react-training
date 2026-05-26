import { IBranchResponse } from '@/libs/features/branch/hooks/useBranchQuery.ts';
import { IBranch } from '@/libs/features/branch/types.ts';

export function mapBranch(branch: IBranchResponse): IBranch {
  return {
    id: branch.id,
    name: branch.name,
    code: branch.code,
  };
}
