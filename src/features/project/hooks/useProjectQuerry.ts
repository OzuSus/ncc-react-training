import { useQuery } from '@tanstack/react-query';
import { fetchProjectApi } from '@/features/project/api/fetchProject.ts';
import { useProjectStore } from '@/features/project/useProjectStore.ts';

type TUseProjectQueryParams = {
  status?: number;
  search?: string;
};

export function useProjectQuery({
  status = 0,
  search = '',
}: TUseProjectQueryParams = {}) {
  const setProjects = useProjectStore((state) => state.setProjects);
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await fetchProjectApi(status, search);
      const projects = data.result || [];
      setProjects(projects);
      return projects;
    },
  });
}
