import React, { memo } from 'react';
import { Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { TASK_TYPE_LABEL } from '@/libs/constants/task.ts';
import { ITask } from '@/libs/features/task/types.ts';

interface IAvailableTaskRowProps {
  task: ITask;
  onAdd: (taskId: number, name: string) => void;
}

export function AvailableTaskRow({ task, onAdd }: IAvailableTaskRowProps) {
  return (
    <Box
      onClick={() => onAdd(task.id, task.name)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 1.5,
        borderBottom: '1px solid #f5f5f5',
        cursor: 'pointer',
        '&:hover': { bgcolor: '#f5f7fc' },
      }}
    >
      <AddCircleOutlineIcon sx={{ fontSize: 20, color: '#555', mr: 1.5 }} />

      <CustomTypography sx={{ flex: 1, fontSize: 14 }}>
        {task.name}
      </CustomTypography>
      <CustomTypography sx={{ fontSize: 13, color: '#888' }}>
        {TASK_TYPE_LABEL[task.type]}
      </CustomTypography>
    </Box>
  );
}

export default memo(AvailableTaskRow);
