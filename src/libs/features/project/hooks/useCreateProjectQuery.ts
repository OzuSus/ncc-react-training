import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createProjectApi,
  ICreateProjectRequest,
} from '@/libs/features/project/api/createProject.ts';

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ICreateProjectRequest) => createProjectApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projectQuantity'] });
    },
  });
}
