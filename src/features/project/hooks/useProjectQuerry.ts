import { useQuery } from '@tanstack/react-query';
import { fetchProjectApi } from '@/features/project/api/fetchProject.ts';

type TUseProjectQueryParams = {
  status?: number;
  search?: string;
};

export function useProjectQuery({
  status = 0,
  search = '',
}: TUseProjectQueryParams = {}) {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await fetchProjectApi(status, search);
      const projects = data.result || [];
      return projects;
    },
  });
}
