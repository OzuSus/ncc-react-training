import { ITaskResponse } from '@/libs/features/task/hooks/useTaskQuery.ts';
import { ITask } from '@/libs/features/task/types.ts';

export function mapTask(task: ITaskResponse): ITask {
  return {
    id: task.id,
    name: task.name,
    type: task.type,
    isDeleted: task.isDeleted,
  };
}
