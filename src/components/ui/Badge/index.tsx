import { Chip, ChipProps } from '@mui/material';

export type TBadgeVariant = 'projectManager' | 'members' | 'type' | 'rangeDate';
const badgeColor: Record<TBadgeVariant, string> = {
  projectManager: '#2e95ea',
  members: '#f44336',
  type: '#f89c26',
  rangeDate: '#4caf50',
};

interface ICustomBadgeProps extends ChipProps {
  badgeVariant: TBadgeVariant;
  label: string;
}

export default function CustomBadge({
  badgeVariant,
  label,
  ...rest
}: ICustomBadgeProps) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        background: badgeColor[badgeVariant],
        color: '#fff',
        fontSize: 11,
        height: 22,
        fontWeight: 700,
        borderRadius: '20px',
        '& .MuiChip-label': { px: 1 },
      }}
      {...rest}
    />
  );
}
