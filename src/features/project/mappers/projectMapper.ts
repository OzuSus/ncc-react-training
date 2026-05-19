import { IProjectResponse } from '@/features/project/hooks/useProjectQuery.ts';
import { IProject } from '@/features/project/types.ts';

export function mapProject(
  project: IProjectResponse['result'][number],
): IProject {
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
