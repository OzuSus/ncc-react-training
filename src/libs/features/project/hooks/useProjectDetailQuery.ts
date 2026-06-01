import { useQuery } from '@tanstack/react-query';
import { fetchProjectDetailApi } from '@/libs/features/project/api/fetchProjectDetail';
import { IProjectDetail } from '@/libs/features/project/types.ts';
import { mapProjectDetail } from '@/libs/features/project/mappers/projectDetailMapper.ts';

export interface IProjectDetailResponse {
  id: number;
  name: string;
  code: string;
  status: number;
  timeStart: string | null;
  timeEnd: string | null;
  note: string | null;
  projectType: number;
  customerId: number;
  isAllUserBelongTo: boolean;
  komuChannelId: string | null;
  isNoticeKMSubmitTS: boolean;
  isNoticeKMRequestOffDate: boolean;
  isNoticeKMApproveRequestOffDate: boolean;
  isNoticeKMRequestChangeWorkingTime: boolean;
  isNoticeKMApproveChangeWorkingTime: boolean;
  tasks: { taskId: number; billable: boolean; id: number }[];
  users: { userId: number; type: number; isTemp: boolean; id: number }[];
}

export function useProjectDetailQuery(projectId: number | null) {
  return useQuery<IProjectDetail>({
    queryKey: ['projectDetail', projectId],
    queryFn: async () => {
      const data = await fetchProjectDetailApi(projectId!);
      return mapProjectDetail(data.result);
    },
    staleTime: 0,
    gcTime: 0,
  });
}
