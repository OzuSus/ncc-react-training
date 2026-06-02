import {
  IExportTimesheet,
  IViewProjecttask,
  IViewProjectTeam,
} from '@/libs/features/project/types';
import {
  IExportTimesheetResponse,
  IViewProjecttaskResponse,
  IViewProjectTeamResponse,
} from '@/libs/features/project/hooks/useViewProjectQuery.ts';

export function mapViewProjectTask(
  task: IViewProjecttaskResponse,
): IViewProjecttask {
  return {
    taskId: task.taskId,
    taskName: task.taskName,
    totalWorkingTime: task.totalWorkingTime,
    billableWorkingTime: task.billableWorkingTime,
    billable: task.billable,
  };
}
export function mapViewProjectTeam(
  team: IViewProjectTeamResponse,
): IViewProjectTeam {
  return {
    userID: team.userID,
    userName: team.userName,
    projectUserType: team.projectUserType,
    totalWorkingTime: team.totalWorkingTime,
    billableWorkingTime: team.billableWorkingTime,
  };
}

export function mapViewProjectExportTimesheet(
  task: IExportTimesheetResponse,
): IExportTimesheet {
  return {
    userName: task.userName,
    dateAt: task.dateAt,
    typeOfWork: task.typeOfWork,
    taskName: task.taskName,
    note: task.note,
    workingTime: task.workingTime,
    targetUserWorkingTime: task.targetUserWorkingTime,
    targetUserName: task.targetUserName,
    roleName: task.roleName,
    isShadow: task.isShadow,
    id: task.id,
  };
}
