import { useQuery } from '@tanstack/react-query';
import { fetchProjectApi } from '@/libs/features/project/api/fetchProject';
import { fetchProjectQuantityApi } from '@/libs/features/project/api/fetchProjectQuantity';
import { IProject, IProjectQuantity } from '@/libs/features/project/types';
import { mapProject } from '@/libs/features/project/mappers/projectMapper.ts';

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
  status,
  search = '',
}: IProjectsRequest = {}) {
  return useQuery<IProject[]>({
    queryKey: ['projects', status, search],
    queryFn: async () => {
      const data = await fetchProjectApi({ status, search });
      return (data.result || []).map(mapProject);
    },
    staleTime: 0,
    gcTime: 0,
  });
}

export function useProjectQuantityQuery() {
  return useQuery<IProjectQuantity[]>({
    queryKey: ['projectQuantity'],
    queryFn: async () => {
      const data = await fetchProjectQuantityApi();
      return data.result || [];
    },
  });
}
