import { memo } from 'react';
import { Box, Checkbox, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CustomTypography } from '@/libs/components/ui/Typography';
import type { IProjectTask } from '@/pages/project/sections/CreateProject';

interface ISelectedTaskRowProps {
  task: IProjectTask;
  onRemove: (taskId: number) => void;
  onToggleBillable: (taskId: number, value: boolean) => void;
}

export function SelectedTaskRow({
  task,
  onRemove,
  onToggleBillable,
}: ISelectedTaskRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 1,
        borderBottom: '1px solid #f5f5f5',
        '&:hover': { bgcolor: '#fafafa' },
      }}
    >
      <IconButton
        size="small"
        onClick={() => onRemove(task.taskId)}
        sx={{ color: '#565656', mr: 1, '&:hover': { color: '#4680ff' } }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <CustomTypography sx={{ flex: 1, fontSize: 14 }}>
        {task.name}
      </CustomTypography>
      <Box sx={{ minWidth: 80, display: 'flex', justifyContent: 'center' }}>
        <Checkbox
          size="medium"
          checked={task.billable}
          onChange={(e) => onToggleBillable(task.taskId, e.target.checked)}
          sx={{
            color: '#c5c4c4',
            '&.Mui-checked': { color: '#4680ff' },
          }}
        />
      </Box>
    </Box>
  );
}

export default memo(SelectedTaskRow);
