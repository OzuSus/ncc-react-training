import { useQuery } from '@tanstack/react-query';
import { fetchProjectApi } from '@/features/project/api/fetchProject.ts';
import { mapProject } from '@/features/project/mappers/projectMapper.ts';
import { IProject } from '@/features/project/types.ts';

export interface IProjectsRequest {
  status?: number;
  search?: string;
}
export interface IProjectResponse {
  result: {
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
  }[];
}
export function useProjectQuery({
  status = 0,
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
