import { memo } from 'react';
import { Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { ITask } from '@/libs/features/task/types.ts';

interface IAvailableTaskRowProps {
  task: ITask;
  onAdd: (taskId: number, name: string) => void;
}

const getTaskTypeLabel = (type: number, t: (key: string) => string) => {
  switch (type) {
    case 0:
      return t('project.task.taskTypes.common');
    case 1:
      return t('project.task.taskTypes.other');
    default:
      return t('project.task.taskTypes.common');
  }
};

export function AvailableTaskRow({ task, onAdd }: IAvailableTaskRowProps) {
  const { t } = useTranslation();

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
        {getTaskTypeLabel(task.type, t)}
      </CustomTypography>
    </Box>
  );
}

export default memo(AvailableTaskRow);
