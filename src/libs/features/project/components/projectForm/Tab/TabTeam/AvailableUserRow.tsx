import { memo } from 'react';
import { Avatar, Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/libs/components/ui/Typography';
import CustomBadge from '@/libs/components/ui/Badge';
import type { IMember } from '@/libs/features/member/types';
import { MemberType } from '@/libs/features/member/types';
import { MEMBER_TYPE_COLOR } from '@/libs/constants/member.ts';

interface IAvalableMemberRowProps {
  member: IMember;
  onAddMember: (member: IMember) => void;
}
const getMemberTypeLabel = (type: number, t: (key: string) => string) => {
  switch (type) {
    case MemberType.Staff:
      return t('project.team.memberTypes.staff');
    case MemberType.Internship:
      return t('project.team.memberTypes.internship');
    case MemberType.Collaborator:
      return t('project.team.memberTypes.collaborator');
    default:
      return t('project.team.memberTypes.staff'); // fallback
  }
};

export function AvailableUserRow({
  member,
  onAddMember,
}: IAvalableMemberRowProps) {
  const { t } = useTranslation();
  return (
    <Box
      onClick={() => onAddMember(member)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 1,
        py: 1,
        cursor: 'pointer',
        borderBottom: '1px solid #f5f5f5',
        '&:hover': { bgcolor: '#f5f7fc' },
        minWidth: 0,
      }}
    >
      <IconButton size="small" sx={{ color: '#aaa', pointerEvents: 'none' }}>
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <Avatar
        src={member.avatarFullPath}
        sx={{ width: 36, height: 36, fontSize: 13 }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            flexWrap: 'wrap',
          }}
        >
          <CustomTypography sx={{ fontSize: 13, fontWeight: 500 }}>
            {member.name}
          </CustomTypography>
          <CustomBadge
            badgeVariant="type"
            label={member.branchDisplayName}
            bgColor={member.branchColor || '#2196f3'}
            sx={{ height: 18, fontSize: 11, borderRadius: 1, fontWeight: 600 }}
          />
          <CustomBadge
            badgeVariant="members"
            label={getMemberTypeLabel(member.type, t)}
            bgColor={MEMBER_TYPE_COLOR[member.type] ?? '#4caf50'}
            sx={{ height: 18, fontSize: 11, borderRadius: 1, fontWeight: 600 }}
          />
        </Box>
        <CustomTypography sx={{ fontSize: 11, color: '#888' }}>
          {member.emailAddress}
        </CustomTypography>
      </Box>
    </Box>
  );
}

export default memo(AvailableUserRow);
