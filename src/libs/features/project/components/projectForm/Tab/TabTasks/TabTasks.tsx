import { useMemo, useState, useCallback } from 'react';
import { Box, CircularProgress, Collapse } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useController, useFormContext } from 'react-hook-form';
import { CustomTypography } from '@/libs/components/ui/Typography';
import type {
  ICreateProjectForm,
  IProjectTask,
} from '@/pages/project/sections/CreateProject';
import { useTaskQuery } from '@/libs/features/task/hooks/useTaskQuery';
import { TaskHeader } from '@/libs/features/project/components/projectForm/Tab/TabTasks/TaskHeader.tsx';
import { SelectedTaskRow } from '@/libs/features/project/components/projectForm/Tab/TabTasks/SelectedtaskRow.tsx';
import AvailableTaskRow from '@/libs/features/project/components/projectForm/Tab/TabTasks/AvailableTaskRow.tsx';

export default function TabTasks() {
  const { control } = useFormContext<ICreateProjectForm>();
  const { field: tasksField } = useController({ name: 'tasks', control });

  const tasks: IProjectTask[] = tasksField.value || [];

  const { data: allTasks = [], isLoading } = useTaskQuery();
  const [selectOpen, setSelectOpen] = useState(true);

  const selectedTaskIds = useMemo(
    () => new Set(tasks.map((task) => task.taskId)),
    [tasks],
  );

  const availableTasks = useMemo(
    () => allTasks.filter((task) => !selectedTaskIds.has(task.id)),
    [allTasks, selectedTaskIds],
  );
  const allChecked = tasks.length > 0 && tasks.every((task) => task.billable);
  const someChecked = tasks.some((task) => task.billable);
  const isIndeterminate = someChecked && !allChecked;

  const handleAddTask = useCallback(
    (taskId: number, name: string) => {
      tasksField.onChange([
        ...(tasksField.value || []),
        { taskId, billable: true, name },
      ]);
    },
    [tasksField],
  );
  const handleRemoveTask = useCallback(
    (taskId: number) => {
      tasksField.onChange(
        (tasksField.value || []).filter(
          (task: IProjectTask) => task.taskId !== taskId,
        ),
      );
    },
    [tasksField],
  );
  const handleToggleBillable = useCallback(
    (taskId: number, value: boolean) => {
      tasksField.onChange(
        (tasksField.value || []).map((task: IProjectTask) =>
          task.taskId === taskId ? { ...task, billable: value } : task,
        ),
      );
    },
    [tasksField],
  );
  const handleToggleAllBillable = useCallback(() => {
    const current = (tasksField.value || []) as IProjectTask[];
    const next = !(current.length > 0 && current.every((t) => t.billable));
    tasksField.onChange(current.map((t) => ({ ...t, billable: next })));
  }, [tasksField]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TaskHeader
        allChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onToggleAll={handleToggleAllBillable}
      />
      {tasks.map((task) => (
        <SelectedTaskRow
          task={task}
          onRemove={handleRemoveTask}
          onToggleBillable={handleToggleBillable}
        />
      ))}
      <Box sx={{ mt: 1 }}>
        <Box
          onClick={() => setSelectOpen((p) => !p)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1.2,
            bgcolor: '#f9f9f9',
            cursor: 'pointer',
            borderTop: '1px solid #f9f9f9',
            borderBottom: '1px solid #f9f9f9',
            '&:hover': { bgcolor: '#f0f0f0' },
          }}
        >
          <CustomTypography sx={{ fontSize: 14, fontWeight: 500 }}>
            Select task
          </CustomTypography>
          {selectOpen ? (
            <KeyboardArrowUpIcon fontSize="small" sx={{ color: '#777' }} />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" sx={{ color: '#777' }} />
          )}
        </Box>
        <Collapse in={selectOpen}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            availableTasks.map((task) => (
              <AvailableTaskRow task={task} onAdd={handleAddTask} />
            ))
          )}
        </Collapse>
      </Box>
    </Box>
  );
}
