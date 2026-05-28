import { useQuery } from '@tanstack/react-query';
import { fetchTaskApi } from '@/libs/features/task/api/fetchTask';
import { ITask } from '@/libs/features/task/types';
import { mapTask } from '@/libs/features/task/mappers/taskMapper.ts';

export interface ITaskResponse {
  id: number;
  name: string;
  type: number;
  isDeleted: boolean;
}

export function useTaskQuery() {
  return useQuery<ITask[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const data = await fetchTaskApi();
      return (data.result || []).map(mapTask);
    },
    gcTime: 0,
    staleTime: 0,
  });
}
