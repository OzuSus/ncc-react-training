import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomBadge from '@/components/ui/Badge';
import { CustomButton } from '@/components/ui/Button';
import { CustomTypography } from '@/components/ui/Typography';
import { PROJECT_TYPE } from '@/constants/projectType.ts';
import { formatDateUKType } from '@/utils/date/formatDateUKType.ts';
import { IProject } from '@/features/project/types.ts';
import React from 'react';

type TProjectRowProps = {
  project: IProject;
  onOpenActions: () => void;
};

export default function ProjectRow({
  project,
  onOpenActions,
}: TProjectRowProps) {
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
        label={PROJECT_TYPE[project.projectType]}
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
        onClick={(e) => onOpenActions(e)}
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
