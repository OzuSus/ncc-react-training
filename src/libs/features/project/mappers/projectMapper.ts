import { IProjectResponse } from '@/libs/features/project/hooks/useProjectQuery';
import { IProject } from '@/libs/features/project/types';

export function mapProject(project: IProjectResponse): IProject {
  return {
    id: project.id,
    customerName: project.customerName,
    name: project.name,
    code: project.code,
    status: project.status,
    pms: project.pms,
    activeMember: project.activeMember,
    projectType: project.projectType,
    timeStart: project.timeStart,
    timeEnd: project.timeEnd,
  };
}
