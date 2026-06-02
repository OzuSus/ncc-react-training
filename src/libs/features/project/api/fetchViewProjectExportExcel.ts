import { httpRequest } from '@/app-core/axiosInstance';
import {
  IExportTimesheetResponse,
  IViewProjectRequest,
} from '@/libs/features/project/hooks/useViewProjectQuery.ts';

export async function exportTimesheetApi(request: IViewProjectRequest) {
  return httpRequest.get<IExportTimesheetResponse[]>(
    'api/services/app/TimeSheetProject/ExportBillableTimesheets',
    { params: request },
  );
}
