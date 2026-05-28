import { IMemberResponse } from '@/libs/features/member/hooks/useMemberQuery.ts';
import { IMember } from '@/libs/features/member/types.ts';

export function mapMember(member: IMemberResponse): IMember {
  return {
    id: member.id,
    name: member.name,
    emailAddress: member.emailAddress,
    isActive: member.isActive,
    type: member.type,
    jobTitle: member.jobTitle,
    level: member.level,
    userCode: member.userCode,
    avatarPath: member.avatarPath,
    avatarFullPath: member.avatarFullPath,
    branch: member.branch,
    branchDisplayName: member.branchDisplayName,
    branchId: member.branchId,
    branchColor: member.branchColor,
    positionId: member.positionId,
    positionName: member.positionName,
  };
}
