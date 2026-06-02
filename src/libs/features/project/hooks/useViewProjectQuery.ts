import { useQuery } from '@tanstack/react-query';
import {
  IExportTimesheet,
  IViewProjecttask,
  IViewProjectTeam,
} from '@/libs/features/project/types.ts';
import { fetchViewProjectTaskApi } from '@/libs/features/project/api/fetchViewProjectTask.ts';
import {
  mapViewProjectExportTimesheet,
  mapViewProjectTask,
  mapViewProjectTeam,
} from '@/libs/features/project/mappers/viewProjectMapper.ts';
import { fetchViewProjectTeamApi } from '@/libs/features/project/api/fetchViewProjectTeaam.ts';
import { exportTimesheetApi } from '@/libs/features/project/api/fetchViewProjectExportExcel.ts';

export interface IViewProjectRequest {
  projectId: number;
  startDate?: string;
  endDate?: string;
}
export interface IViewProjecttaskResponse {
  taskId: number;
  taskName: string;
  totalWorkingTime: number;
  billableWorkingTime: number;
  billable: boolean;
}
export interface IViewProjectTeamResponse {
  userID: number;
  userName: string;
  projectUserType: number;
  totalWorkingTime: number;
  billableWorkingTime: number;
}
export interface IExportTimesheetResponse {
  userName: string;
  dateAt: string;
  typeOfWork: number;
  taskName: string;
  note: string;
  workingTime: number;
  targetUserWorkingTime: number;
  targetUserName: string;
  roleName: string;
  isShadow: boolean;
  id: number;
}

export function useTaskStatisticQuery(
  projectId: number,
  startDate?: string,
  endDate?: string,
) {
  return useQuery<IViewProjecttask[]>({
    queryKey: ['viewProjectTask', projectId, startDate, endDate],
    queryFn: async () => {
      const data = await fetchViewProjectTaskApi({
        projectId: projectId,
        startDate,
        endDate,
      });
      return (data.result || []).map(mapViewProjectTask);
    },
    staleTime: 0,
    gcTime: 0,
  });
}

export function useTeamStatisticQuery(
  projectId: number,
  startDate?: string,
  endDate?: string,
) {
  return useQuery<IViewProjectTeam[]>({
    queryKey: ['viewProjectTeam', projectId, startDate, endDate],
    queryFn: async () => {
      const data = await fetchViewProjectTeamApi({
        projectId: projectId,
        startDate,
        endDate,
      });
      return (data.result || []).map(mapViewProjectTeam);
    },
    staleTime: 0,
    gcTime: 0,
  });
}

export function useExportExcelQuery(
  projectId: number,
  startDate?: string,
  endDate?: string,
) {
  return useQuery<IExportTimesheet[]>({
    queryKey: ['excelTimesheet', projectId, startDate, endDate],
    queryFn: async () => {
      const data = await exportTimesheetApi({
        projectId: projectId,
        startDate,
        endDate,
      });
      return (data.result || []).map(mapViewProjectExportTimesheet);
    },
    staleTime: 0,
    gcTime: 0,
  });
}
