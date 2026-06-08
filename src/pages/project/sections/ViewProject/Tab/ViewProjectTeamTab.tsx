import { useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import StatTable from '@/libs/features/project/components/viewProject/StatTable.tsx';

export interface ITeamStatisticRow {
  userName: string;
  totalWorkingTime: number;
  billableWorkingTime: number;
}
export interface ProjectTeamTabProps {
  loading: boolean;
  teamData: ITeamStatisticRow[];
}
export default function ViewProjectTeamTab({
  loading,
  teamData,
}: ProjectTeamTabProps) {
  const { t } = useTranslation();
  const { totalTeamTime, totalTeamBillable } = useMemo(() => {
    const totalTeamTime = teamData.reduce((s, t) => s + t.totalWorkingTime, 0);
    const totalTeamBillable = teamData.reduce(
      (s, t) => s + t.billableWorkingTime,
      0,
    );
    return { totalTeamTime, totalTeamBillable };
  }, [teamData]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }
  return (
    <StatTable
      headerLeft={t('project.view.table.name')}
      headerHours={t('project.view.table.hour')}
      headerRight={t('project.view.table.billableHour')}
      showBillable
      totalTime={totalTeamTime}
      totalBillable={totalTeamBillable}
      rows={teamData.map((u) => ({
        label: u.userName,
        totalTime: u.totalWorkingTime,
        billableTime: u.billableWorkingTime,
      }))}
    />
  );
}
