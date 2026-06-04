import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Tab,
  Tabs,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { useCreateProjectMutation } from '@/libs/features/project/hooks/useCreateProjectQuery';
import TabGeneral from '@/libs/features/project/components/projectForm/Tab/TabGeneral/TabGeneral';
import TabTeam from '@/libs/features/project/components/projectForm/Tab/TabTeam/TabTeam';
import TabTasks from '@/libs/features/project/components/projectForm/Tab/TabTasks/TabTasks';
import TabNotification from '@/libs/features/project/components/projectForm/Tab/TabNotification/TabNotification';
import { notify } from '@/libs/constants/notify';
import axios from 'axios';
import CustomSnackbar from '@/libs/components/ui/Snackbar';
import useSnackbar from '@/libs/hooks/useSnackbar';
import { MemberRole } from '@/libs/features/member/types';
import { errorMessages } from '@/libs/constants/errors';
import { useAlertDialog } from '@/libs/hooks/useAlert';
import AlertDialog from '@/libs/components/ui/Alert';
import { useProjectDetailQuery } from '@/libs/features/project/hooks/useProjectDetailQuery';
import { useMemberQuery } from '@/libs/features/member/hooks/useMemberQuery';
import { useTaskQuery } from '@/libs/features/task/hooks/useTaskQuery';
import type {
  ICreateProjectForm,
  IProjectMember,
  IProjectTask,
} from '@/pages/project/sections/CreateProject';

const TABS = ['General', 'Team', 'Task', 'Notification'];

interface IEditProjectModalProps {
  open: boolean;
  projectId: number | null;
  onClose: () => void;
}

export default function EditProjectModal({
  open,
  projectId,
  onClose,
}: IEditProjectModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const { snackbar, close, showError, showSuccess } = useSnackbar();
  const { alert, showAlert, handleClose: handleAlertClose } = useAlertDialog();
  const { data: projectDetail, isLoading: loadingDetail } =
    useProjectDetailQuery(open ? projectId : null);
  const { data: allMembers = [] } = useMemberQuery();
  const { data: allTasks = [] } = useTaskQuery();

  const methods = useForm<ICreateProjectForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  useEffect(() => {
    if (!projectDetail || !open) return;
    const members: IProjectMember[] = projectDetail.users
      .map((u) => {
        const memberInfo = allMembers.find((m) => m.id === u.userId);
        if (!memberInfo) return null;
        return {
          userId: u.userId,
          type: u.type,
          isTemp: u.isTemp,
          name: memberInfo.name,
          emailAddress: memberInfo.emailAddress,
          avatarFullPath: memberInfo.avatarFullPath,
          branchDisplayName: memberInfo.branchDisplayName,
          branchColor: memberInfo.branchColor,
          userType: memberInfo.type,
        } as IProjectMember;
      })
      .filter(Boolean) as IProjectMember[];

    const tasks: IProjectTask[] = projectDetail.tasks.map((t) => {
      const taskInfo = allTasks.find((task) => task.id === t.taskId);
      return {
        taskId: t.taskId,
        billable: t.billable,
        name: taskInfo?.name ?? `Task ${t.taskId}`,
      };
    });
    const formatDate = (dateStr: string | null) => {
      if (!dateStr) return '';
      return dateStr.split('T')[0];
    };
    methods.reset({
      customerId: projectDetail.customerId,
      name: projectDetail.name,
      code: projectDetail.code,
      timeStart: formatDate(projectDetail.timeStart ?? ''),
      timeEnd: formatDate(projectDetail.timeEnd ?? ''),
      note: projectDetail.note ?? '',
      isAllUserBelongTo: projectDetail.isAllUserBelongTo,
      projectType: projectDetail.projectType,
      members,
      tasks,
      komuChannelId: projectDetail.komuChannelId ?? '',
      isNoticeKMSubmitTS: projectDetail.isNoticeKMSubmitTS,
      isNoticeKMRequestOffDate: projectDetail.isNoticeKMRequestOffDate,
      isNoticeKMApproveRequestOffDate:
        projectDetail.isNoticeKMApproveRequestOffDate,
      isNoticeKMRequestChangeWorkingTime:
        projectDetail.isNoticeKMRequestChangeWorkingTime,
      isNoticeKMApproveChangeWorkingTime:
        projectDetail.isNoticeKMApproveChangeWorkingTime,
    });
  }, [projectDetail, allMembers, allTasks, open]);
  const { mutate: saveProject, isPending } = useCreateProjectMutation();
  const handleClose = () => {
    if (isPending) return;
    methods.reset();
    setActiveTab(0);
    onClose();
  };
  const onSubmit = async (data: ICreateProjectForm) => {
    if (!data.members || data.members.length === 0) {
      showAlert(errorMessages.TEAM.REQUIRED_AT_LEAST_1);
      return;
    }
    const hasPM = data.members.some((m) => m.type === MemberRole.PM);
    if (!hasPM) {
      showAlert(errorMessages.TEAM.REQUIRED_PM);
      return;
    }
    if (!data.tasks || data.tasks.length === 0) {
      showAlert(errorMessages.TASK.REQUIRED_AT_LEAST_1);
      return;
    }
    saveProject(
      {
        id: projectId!,
        customerId: data.customerId as number,
        name: data.name,
        code: data.code,
        timeStart: data.timeStart || undefined,
        timeEnd: data.timeEnd || undefined,
        note: data.note || undefined,
        isAllUserBelongTo: data.isAllUserBelongTo,
        projectType: data.projectType,
        projectTargetUsers: [],
        users: data.members.map((m) => ({
          userId: m.userId,
          type: m.type,
          isTemp: m.isTemp,
        })),
        tasks: data.tasks.map((t) => ({
          taskId: t.taskId,
          billable: t.billable,
        })),
        komuChannelId: data.komuChannelId,
        isNoticeKMSubmitTS: data.isNoticeKMSubmitTS,
        isNoticeKMRequestOffDate: data.isNoticeKMRequestOffDate,
        isNoticeKMApproveRequestOffDate: data.isNoticeKMApproveRequestOffDate,
        isNoticeKMRequestChangeWorkingTime:
          data.isNoticeKMRequestChangeWorkingTime,
        isNoticeKMApproveChangeWorkingTime:
          data.isNoticeKMApproveChangeWorkingTime,
      },
      {
        onSuccess: (res) => {
          if (res?.success === false) {
            showError(res?.error?.message || notify.PROJECT.UPDATE_FAILDED);
            return;
          }
          showSuccess(notify.PROJECT.UPDATE_SUCCESS);
          handleClose();
        },
        onError: (err: unknown) => {
          if (axios.isAxiosError(err)) {
            const messageError =
              err.response?.data?.error?.message ??
              notify.PROJECT.UPDATE_FAILDED;
            showError(messageError);
            return;
          }
          showError((err as Error)?.message || notify.PROJECT.UPDATE_FAILDED);
        },
      },
    );
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '15px !important' } }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 3,
            px: 3,
          }}
        >
          <CustomTypography sx={{ fontSize: 18, fontWeight: 700 }}>
            Edit Project{projectDetail ? ` : ${projectDetail.name}` : ''}
          </CustomTypography>
          <IconButton onClick={handleClose} size="small" disabled={isPending}>
            <CloseIcon />
          </IconButton>
        </Box>

        <FormProvider {...methods}>
          <Box sx={{ px: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              sx={{
                '& .MuiTab-root': {
                  fontSize: 14,
                  textTransform: 'none',
                  color: '#7f7f7f',
                  fontWeight: 400,
                },
                '& .Mui-selected': { color: '#131313', fontWeight: 500 },
                '& .MuiTabs-indicator': { bgcolor: '#4680ff' },
              }}
            >
              {TABS.map((tab) => (
                <Tab key={tab} label={tab} />
              ))}
            </Tabs>
          </Box>

          <DialogContent dividers sx={{ p: 0, minHeight: 460 }}>
            {loadingDetail ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 460,
                }}
              >
                <CircularProgress size={32} />
              </Box>
            ) : (
              <>
                {activeTab === 0 && (
                  <Box sx={{ px: 3, py: 2 }}>
                    <TabGeneral />
                  </Box>
                )}
                {activeTab === 1 && <TabTeam />}
                {activeTab === 2 && <TabTasks />}
                {activeTab === 3 && <TabNotification />}
              </>
            )}
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <CustomButton
              variant="outlined"
              onClick={handleClose}
              disabled={isPending}
              sx={{ borderColor: '#4680ff', color: '#4680ff' }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant="contained"
              onClick={methods.handleSubmit(onSubmit)}
              disabled={isPending || loadingDetail}
              sx={{ bgcolor: '#4680ff', '&:hover': { bgcolor: '#3f78ff' } }}
              startIcon={
                isPending ? (
                  <CircularProgress size={16} sx={{ color: '#fff' }} />
                ) : undefined
              }
            >
              Save
            </CustomButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
      <AlertDialog
        open={alert.open}
        text={alert.text}
        variant={alert.variant}
        onClose={handleAlertClose}
      />
      <CustomSnackbar
        open={snackbar.open}
        onClose={close}
        autoHideDuration={snackbar.autoHideDuration}
        position={snackbar.position}
        alertColor={snackbar.alertColor}
        message={snackbar.message}
      />
    </>
  );
}
