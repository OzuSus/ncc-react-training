import { useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import StatTable from '@/libs/features/project/components/viewProject/StatTable.tsx';

export interface ITaskStatisticRow {
  taskName: string;
  totalWorkingTime: number;
  billableWorkingTime: number;
  billable: boolean;
}
export interface ProjectTasksTabProps {
  loading: boolean;
  taskData: ITaskStatisticRow[];
}
export default function ViewProjectTasksTab({
  loading,
  taskData,
}: ProjectTasksTabProps) {
  const { t } = useTranslation();
  const {
    billableTasks,
    nonBillableTasks,
    totalBillableTime,
    totalBillableHours,
  } = useMemo(() => {
    const billableTasks = taskData.filter((t) => t.billable);
    const nonBillableTasks = taskData.filter((t) => !t.billable);
    const totalBillableTime = billableTasks.reduce(
      (s, t) => s + t.totalWorkingTime,
      0,
    );
    const totalBillableHours = billableTasks.reduce(
      (s, t) => s + t.billableWorkingTime,
      0,
    );
    return {
      billableTasks,
      nonBillableTasks,
      totalBillableTime,
      totalBillableHours,
    };
  }, [taskData]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <Box>
      <StatTable
        headerLeft={t('project.view.table.billableTasks')}
        headerHours={t('project.view.table.hours')}
        headerRight={t('project.view.table.billableHours')}
        showBillable
        totalTime={totalBillableTime}
        totalBillable={totalBillableHours}
        rows={billableTasks.map((task) => ({
          label: task.taskName,
          totalTime: task.totalWorkingTime,
          billableTime: task.billableWorkingTime,
        }))}
      />

      {nonBillableTasks.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <StatTable
            headerLeft={t('project.view.table.nonBillableTasks')}
            headerHours={t('project.view.table.hours')}
            headerRight=""
            showBillable={false}
            totalTime={nonBillableTasks.reduce(
              (s, t) => s + t.totalWorkingTime,
              0,
            )}
            totalBillable={0}
            rows={nonBillableTasks.map((t) => ({
              label: t.taskName,
              totalTime: t.totalWorkingTime,
              billableTime: 0,
            }))}
          />
        </Box>
      )}
    </Box>
  );
}
