import { useMutation } from '@tanstack/react-query';
import { deleteProjectApi } from '@/libs/features/project/api/deleteProject';
import { inactiveProjectApi } from '@/libs/features/project/api/inactiveProject';
import { activeProjectApi } from '@/libs/features/project/api/activeProject';

export function useDeleteProjectMutation() {
  return useMutation({
    mutationFn: (id: number) => deleteProjectApi(id),
  });
}

export function useInactiveProjectMutation() {
  return useMutation({
    mutationFn: (id: number) => inactiveProjectApi(id),
  });
}

export function useActiveProjectMutation() {
  return useMutation({
    mutationFn: (id: number) => activeProjectApi(id),
  });
}
