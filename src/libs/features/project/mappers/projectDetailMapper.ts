import { IProjectDetailResponse } from '@/libs/features/project/hooks/useProjectDetailQuery.ts';
import { IProjectDetail } from '@/libs/features/project/types.ts';

export function mapProjectDetail(
  projectDetail: IProjectDetailResponse,
): IProjectDetail {
  return {
    id: projectDetail.id,
    customerId: projectDetail.customerId,
    isAllUserBelongTo: projectDetail.isAllUserBelongTo,
    komuChannelId: projectDetail.komuChannelId,
    isNoticeKMSubmitTS: projectDetail.isNoticeKMSubmitTS,
    isNoticeKMRequestOffDate: projectDetail.isNoticeKMRequestOffDate,
    isNoticeKMApproveRequestOffDate:
      projectDetail.isNoticeKMApproveRequestOffDate,
    isNoticeKMRequestChangeWorkingTime:
      projectDetail.isNoticeKMRequestChangeWorkingTime,
    note: projectDetail.note,
    isNoticeKMApproveChangeWorkingTime:
      projectDetail.isNoticeKMApproveChangeWorkingTime,
    tasks: projectDetail.tasks,
    users: projectDetail.users,
    name: projectDetail.name,
    code: projectDetail.code,
    status: projectDetail.status,
    projectType: projectDetail.projectType,
    timeStart: projectDetail.timeStart,
    timeEnd: projectDetail.timeEnd,
  };
}
