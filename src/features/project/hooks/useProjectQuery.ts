import { useQuery } from '@tanstack/react-query';
import { fetchProjectApi } from '@/features/project/api/fetchProject';
import { mapProject } from '@/features/project/mappers/projectMapper';
import { IProject, ProjectStatus } from '@/features/project/types';

export interface IProjectsRequest {
  status?: number;
  search?: string;
}
export interface IProjectResponse {
  id: number;
  customerName: string;
  name: string;
  code: string;
  status: number;
  pms: string[];
  activeMember: number;
  projectType: number;
  timeStart: string;
  timeEnd: string | null;
}
export function useProjectQuery({
  status = ProjectStatus.Active,
  search = '',
}: IProjectsRequest = {}) {
  return useQuery<IProject[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await fetchProjectApi({ status, search });
      return (data.result || []).map(mapProject);
    },
  });
}
