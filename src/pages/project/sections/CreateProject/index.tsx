import { useState } from 'react';
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
import { ProjectType } from '@/libs/features/project/types';
import { useCreateProjectMutation } from '@/libs/features/project/hooks/useCreateProjectQuery';
import TabGeneral from '@/libs/features/project/components/projectForm/Tab/TabGeneral/TabGeneral';
import TabTeam from '@/libs/features/project/components/projectForm/Tab/TabTeam/TabTeam';
import { notify } from '@/libs/constants/notify';
import axios from 'axios';
import CustomSnackbar from '@/libs/components/ui/Snackbar';
import useSnackbar from '@/libs/hooks/useSnackbar';
import { MemberRole } from '@/libs/features/member/types.ts';
import { errorMessages } from '@/libs/constants/errors.ts';
import { useAlertDialog } from '@/libs/hooks/useAlert.ts';
import AlertDialog from '@/libs/components/ui/Alert';
import TabTasks from '@/libs/features/project/components/projectForm/Tab/TabTasks/TabTasks.tsx';
import TabNotification from '@/libs/features/project/components/projectForm/Tab/TabNotification/TabNotification.tsx';

export interface IProjectMember {
  userId: number;
  name: string;
  type: number;
  emailAddress: string;
  avatarFullPath: string;
  branchDisplayName: string;
  branchColor: string;
  userType: number;
  isTemp: boolean;
}
export interface IProjectTask {
  taskId: number;
  billable: boolean;
  name: string;
}

export interface ICreateProjectForm {
  customerId: number | '';
  name: string;
  code: string;
  timeStart: string;
  timeEnd: string;
  note: string;
  isAllUserBelongTo: boolean;
  projectType: number;
  members: IProjectMember[];
  tasks: IProjectTask[];
  komuChannelId: string;
  isNoticeKMSubmitTS: boolean;
  isNoticeKMRequestOffDate: boolean;
  isNoticeKMApproveRequestOffDate: boolean;
  isNoticeKMRequestChangeWorkingTime: boolean;
  isNoticeKMApproveChangeWorkingTime: boolean;
}

const TABS = ['General', 'Team', 'Task', 'Notification'];

interface ICreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({
  open,
  onClose,
}: ICreateProjectModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const { snackbar, close, showError, showSuccess } = useSnackbar();
  const { alert, showAlert, handleClose: handleAlertClose } = useAlertDialog();

  const methods = useForm<ICreateProjectForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      customerId: '',
      name: '',
      code: '',
      timeStart: '',
      timeEnd: '',
      note: '',
      isAllUserBelongTo: false,
      projectType: ProjectType.FF,
      members: [],
      tasks: [],
      komuChannelId: '',
      isNoticeKMSubmitTS: false,
      isNoticeKMRequestOffDate: false,
      isNoticeKMApproveRequestOffDate: false,
      isNoticeKMRequestChangeWorkingTime: false,
      isNoticeKMApproveChangeWorkingTime: false,
    },
  });

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
        komuChannelId: data.komuChannelId || undefined,
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
            showError(res?.error?.message || notify.PROJECT.CREATE_FAILED);
            return;
          }
          showSuccess(notify.PROJECT.CREATE_SUCCESS);
          handleClose();
        },
        onError: (err: unknown) => {
          if (axios.isAxiosError(err)) {
            const messageError =
              err.response?.data?.error?.message ??
              notify.PROJECT.CREATE_FAILED;
            showError(messageError);
            return;
          }
          showError((err as Error)?.message || notify.PROJECT.CREATE_FAILED);
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
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '15px !important',
          },
        }}
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
            Create Project
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
                '& .Mui-selected': {
                  color: '#131313',
                  fontWeight: 500,
                },
                '& .MuiTabs-indicator': {
                  bgcolor: '#4680ff',
                },
              }}
            >
              {TABS.map((tab) => (
                <Tab key={tab} label={tab} />
              ))}
            </Tabs>
          </Box>
          <DialogContent dividers sx={{ p: 0, minHeight: 460 }}>
            {activeTab === 0 && (
              <Box sx={{ px: 3, py: 2 }}>
                <TabGeneral />
              </Box>
            )}
            {activeTab === 1 && <TabTeam />}
            {activeTab === 2 && <TabTasks />}
            {activeTab === 3 && <TabNotification />}
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
              disabled={isPending}
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
        message={snackbar.message}
        alertColor={snackbar.alertColor}
        autoHideDuration={snackbar.autoHideDuration}
        position={snackbar.position}
        onClose={close}
      />
    </>
  );
}
