import { useMemo, useState } from 'react';
import {
  Box,
  Dialog,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import {
  useExportExcelQuery,
  useTaskStatisticQuery,
  useTeamStatisticQuery,
} from '@/libs/features/project/hooks/useViewProjectQuery.ts';
import {
  getDateRange,
  formatMinutesToHours,
} from '@/libs/utils/date/dateRange.ts';
import CustomTimeDialog from '@/libs/features/project/components/viewProject/CustomTimeDialog.tsx';
import ViewProjectTasksTab from '@/pages/project/sections/ViewProject/Tab/ViewProjectTasksTab.tsx';
import ViewProjectTeamTab from '@/pages/project/sections/ViewProject/Tab/ViewProjectTeamTab.tsx';
import { DATE_RANGE_FILTER_OPTIONS } from '@/libs/constants/dateRange';
import { FilterDateRangeMode } from '@/libs/features/project/types.ts';

interface IViewProjectModalProps {
  open: boolean;
  projectId: number;
  onClose: () => void;
}

export default function ViewProjectModal({
  open,
  projectId,
  onClose,
}: IViewProjectModalProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [filterMode, setFilterMode] = useState<FilterDateRangeMode>(
    FilterDateRangeMode.Week,
  );
  const [offset, setOffset] = useState(0);
  const [customRange, setCustomRange] = useState<{
    start: string;
    end: string;
  }>();
  const [openCustomDialog, setOpenCustomDialog] = useState(false);

  const dateRange = useMemo(
    () => getDateRange(filterMode, offset, t, customRange),
    [filterMode, offset, t, customRange],
  );

  const { data: taskData = [], isLoading: loadingTasks } =
    useTaskStatisticQuery(projectId, dateRange.startDate, dateRange.endDate);
  const { data: teamData = [], isLoading: loadingTeam } = useTeamStatisticQuery(
    projectId,
    dateRange.startDate,
    dateRange.endDate,
  );
  const { refetch: refetchExportExcel, isLoading: LoadingExport } =
    useExportExcelQuery(projectId, dateRange.startDate, dateRange.endDate);

  const handleFilterChange = (mode: FilterDateRangeMode) => {
    if (mode === 'customTime') setOpenCustomDialog(true);
    setFilterMode(mode);
    setOffset(0);
  };

  const handleExport = async () => {
    if (!projectId) return;
    try {
      const { data } = await refetchExportExcel();
      const items = data ?? [];
      if (!items.length) return;
      const headers = [
        'Time Date',
        'User Name',
        'Role Name',
        'Type of Work',
        'Total Hours',
        'Task Description',
        'Note',
      ];
      const rows = items.map((r) => [
        r.dateAt.split('T')[0],
        r.userName,
        r.roleName,
        r.typeOfWork == 0 ? 'Normal Working' : 'OverTime',
        formatMinutesToHours(r.workingTime),
        r.taskName,
        r.note,
      ]);
      const csvContent = [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell ?? ''}"`).join(','))
        .join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '12px !important',
            p: 3,
            height: '75%',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            flex: '0 0 auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: 1.5,
              overflow: 'hidden',
            }}
          >
            <IconButton
              size="small"
              onClick={() => setOffset((p) => p - 1)}
              sx={{ borderRadius: 0, px: 1.5 }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Box sx={{ width: 1, bgcolor: '#ddd', alignSelf: 'stretch' }} />
            <IconButton
              size="small"
              onClick={() => setOffset((p) => p + 1)}
              sx={{ borderRadius: 0, px: 1.5 }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
          <CustomTypography sx={{ fontSize: 18, fontWeight: 600, flex: 1 }}>
            {dateRange.label}
          </CustomTypography>
          <Select
            size="small"
            value={filterMode}
            onChange={(e) =>
              handleFilterChange(e.target.value as FilterDateRangeMode)
            }
            sx={{ minWidth: 140, fontSize: 14, borderRadius: 1.5 }}
          >
            {DATE_RANGE_FILTER_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 14 }}>
                {t(`project.view.dateRange.${opt.value}`)}
              </MenuItem>
            ))}
          </Select>

          <CustomButton
            variant="contained"
            onClick={handleExport}
            loading={LoadingExport}
            sx={{
              bgcolor: '#4680ff',
              boxShadow: 'none',
              borderRadius: 1.5,
            }}
          >
            {t('project.view.export')}
          </CustomButton>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            '& .MuiTab-root': {
              fontSize: 14,
              textTransform: 'none',
              fontWeight: 400,
              color: '#888',
            },
            '& .Mui-selected': { color: '#4680ff !important', fontWeight: 600 },
            '& .MuiTabs-indicator': { bgcolor: '#4680ff' },
          }}
        >
          <Tab label={t('project.view.tabs.tasks')} />
          <Tab label={t('project.view.tabs.team')} />
        </Tabs>
        <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          {activeTab === 0 && (
            <ViewProjectTasksTab loading={loadingTasks} taskData={taskData} />
          )}
          {activeTab === 1 && (
            <ViewProjectTeamTab loading={loadingTeam} teamData={teamData} />
          )}
        </Box>
      </Dialog>
      <CustomTimeDialog
        open={openCustomDialog}
        onClose={() => setOpenCustomDialog(false)}
        onSave={(start, end) => {
          setCustomRange({ start, end });
          setOpenCustomDialog(false);
        }}
      />
    </>
  );
}
