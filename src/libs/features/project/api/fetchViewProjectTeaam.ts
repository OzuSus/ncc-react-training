import { httpRequest } from '@/app-core/axiosInstance.ts';
import {
  IViewProjectRequest,
  IViewProjectTeamResponse,
} from '@/libs/features/project/hooks/useViewProjectQuery.ts';

export async function fetchViewProjectTeamApi(request: IViewProjectRequest) {
  return httpRequest.get<IViewProjectTeamResponse[]>(
    'api/services/app/TimeSheetProject/GetTimeSheetStatisticTeams',
    { params: request },
  );
}
