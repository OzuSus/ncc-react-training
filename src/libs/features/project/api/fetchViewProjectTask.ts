import { httpRequest } from '@/app-core/axiosInstance.ts';
import {
  IViewProjectRequest,
  IViewProjecttaskResponse,
} from '@/libs/features/project/hooks/useViewProjectQuery.ts';

export async function fetchViewProjectTaskApi(request: IViewProjectRequest) {
  return httpRequest.get<IViewProjecttaskResponse[]>(
    'api/services/app/TimeSheetProject/GetTimeSheetStatisticTasks',
    { params: request },
  );
}
