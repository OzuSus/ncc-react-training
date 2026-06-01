import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomBadge from '@/libs/components/ui/Badge';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { BADGE_PROJECT_TYPE } from '@/libs/constants/projectType.ts';
import { formatDateUKType } from '@/libs/utils/date/formatDateUKType.ts';
import { IProject } from '@/libs/features/project/types.ts';
import React from 'react';

interface IProjectRowProps {
  project: IProject;
  onOpenActions: (event, projectId: number) => void;
}

export default function ProjectRow({
  project,
  onOpenActions,
}: IProjectRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1.5,
        gap: 1,
        borderBottom: '1px solid #f0f0f0',
        '&:hover': {
          background: '#fafafa',
        },
        transition: 'background 0.15s',
      }}
    >
      <CustomTypography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: '#1D2630',
          whiteSpace: 'nowrap',
        }}
      >
        {project.name}
      </CustomTypography>
      <CustomBadge
        badgeVariant="projectManager"
        label={project.pms.join(', ')}
      />
      <CustomBadge
        badgeVariant="members"
        label={`${project.activeMember} members`}
      />
      <CustomBadge
        badgeVariant="type"
        label={BADGE_PROJECT_TYPE[project.projectType]}
      />
      <CustomBadge
        badgeVariant="rangeDate"
        label={`${formatDateUKType(project.timeStart)} - ${formatDateUKType(project.timeEnd)}`}
      />

      <Box sx={{ flex: 1 }} />

      <CustomButton
        size="small"
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              fontSize: '16px !important',
            }}
          />
        }
        onClick={(e) => onOpenActions(e, project.id)}
        variant="text"
        sx={{
          color: '#555',
          fontWeight: 500,
          fontSize: 13,
          px: 1.5,
          border: '1px solid #ddd',
          borderRadius: 1,
          minWidth: 90,
          flexShrink: 0,
          '&:hover': {
            background: '#f0f0f0',
          },
        }}
      >
        Actions
      </CustomButton>
    </Box>
  );
}
