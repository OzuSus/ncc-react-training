import { httpRequest } from '@/app-core/axiosInstance';

export interface ICreateProjectRequest {
  code: string;
  customerId: number;
  name: string;
  isAllUserBelongTo?: boolean;
  isNoticeKMApproveChangeWorkingTime?: boolean;
  isNoticeKMApproveRequestOffDate?: boolean;
  isNoticeKMRequestChangeWorkingTime?: boolean;
  isNoticeKMRequestOffDate?: boolean;
  isNoticeKMSubmitTS?: boolean;
  komuChannelId?: string;
  note?: string;
  projectTargetUsers: string[];
  projectType: number;
  timeStart?: string;
  timeEnd?: string;
  users: { isTemp: boolean; type: number; userId: number }[];
  tasks: { taskId: number; billable: boolean }[];
}

export async function createProjectApi(body: ICreateProjectRequest) {
  return httpRequest.post('api/services/app/Project/Save', body);
}
