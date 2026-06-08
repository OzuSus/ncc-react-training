import { memo } from 'react';
import { Avatar, Box, IconButton, MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CustomTypography } from '@/libs/components/ui/Typography';
import CustomBadge from '@/libs/components/ui/Badge';
import type { IProjectMember } from '@/pages/project/sections/CreateProject';
import {
  MEMBER_ROLE_OPTIONS,
  TEMP_OPTIONS,
  MEMBER_TYPE_COLOR,
} from '@/libs/constants/member.ts';
import { MemberType } from '@/libs/features/member/types.ts';
import { useTranslation } from 'react-i18next';

export type MemberUpdateKey = 'type' | 'isTemp';
export type MemberUpdateValue = number | boolean;
interface ISelectedMemberRowProps {
  member: IProjectMember;
  onRemove: (userId: number) => void;
  onUpdate: (
    userId: number,
    key: MemberUpdateKey,
    value: MemberUpdateValue,
  ) => void;
}

const getMemberTypeLabel = (userType: number, t: (key: string) => string) => {
  switch (userType) {
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
export function SelectedMemberRow({
  member,
  onRemove,
  onUpdate,
}: ISelectedMemberRowProps) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        py: 1,
        px: 1,
        borderBottom: '1px solid #f5f5f5',
        minWidth: 0,
      }}
    >
      <IconButton
        size="small"
        onClick={() => onRemove(member.userId)}
        sx={{ color: '#aaa', '&:hover': { color: '#4680ff' } }}
      >
        <CloseIcon fontSize="small" />
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
            minWidth: 0,
            flexWrap: 'wrap',
          }}
        >
          <CustomTypography
            sx={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}
          >
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
            label={getMemberTypeLabel(member.userType, t)}
            bgColor={MEMBER_TYPE_COLOR[member.userType] ?? '#4caf50'}
            sx={{ height: 18, fontSize: 11, borderRadius: 1, fontWeight: 600 }}
          />
        </Box>
        <CustomTypography sx={{ fontSize: 13, color: '#5b6b79' }}>
          {member.emailAddress}
        </CustomTypography>
      </Box>
      <Select
        size="small"
        value={member.type}
        onChange={(e) =>
          onUpdate(member.userId, 'type', Number(e.target.value))
        }
        sx={{ fontSize: 12, height: 30, minWidth: 90, borderRadius: 1 }}
      >
        {MEMBER_ROLE_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 12 }}>
            {opt.value === 0 && t('project.team.roles.member')}
            {opt.value === 1 && t('project.team.roles.pm')}
            {opt.value === 2 && t('project.team.roles.shadow')}
            {opt.value === 3 && t('project.team.roles.deactive')}
          </MenuItem>
        ))}
      </Select>
      <Select
        size="small"
        value={member.isTemp ? 'true' : 'false'}
        onChange={(e) =>
          onUpdate(member.userId, 'isTemp', e.target.value === 'true')
        }
        sx={{
          fontSize: 12,
          height: 30,
          minWidth: 80,
          borderRadius: 1,
          color: '#4680ff',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#4680ff' },
        }}
      >
        {TEMP_OPTIONS.map((opt) => (
          <MenuItem
            key={String(opt.value)}
            value={String(opt.value)}
            sx={{ fontSize: 12 }}
          >
            {opt.value === false && t('project.team.tempOptions.official')}
            {opt.value === true && t('project.team.tempOptions.temp')}
          </MenuItem>
        ))}
      </Select>
      <IconButton size="small" sx={{ color: '#aaa' }}>
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default memo(SelectedMemberRow);
