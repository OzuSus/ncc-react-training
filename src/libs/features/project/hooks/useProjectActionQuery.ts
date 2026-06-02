import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProjectApi } from '@/libs/features/project/api/deleteProject';
import { inactiveProjectApi } from '@/libs/features/project/api/inactiveProject';
import { activeProjectApi } from '@/libs/features/project/api/activeProject';

function invalidateProjectQueries(
  queryClient: ReturnType<typeof useQueryClient>,
) {
  queryClient.invalidateQueries({ queryKey: ['projects'] });
  queryClient.invalidateQueries({ queryKey: ['projectQuantity'] });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProjectApi(id),
    onSuccess: () => invalidateProjectQueries(queryClient),
  });
}

export function useInactiveProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => inactiveProjectApi(id),
    onSuccess: () => invalidateProjectQueries(queryClient),
  });
}

export function useActiveProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => activeProjectApi(id),
    onSuccess: () => invalidateProjectQueries(queryClient),
  });
}
