import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Tab,
  Tabs,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { ProjectType } from '@/libs/features/project/types';
import { useCreateProjectMutation } from '@/libs/features/project/hooks/useCreateProjectQuery';
import TabGeneral from '@/pages/project/sections/CreateProject/Tab/TabGeneral/TabGeneral.tsx';
import { notify } from '@/libs/constants/notify.ts';
import type { AxiosError } from 'axios';

export interface ICreateProjectForm {
  customerId: number | '';
  name: string;
  code: string;
  timeStart: string;
  timeEnd: string;
  note: string;
  isAllUserBelongTo: boolean;
  projectType: number;
}

const TABS = ['General'];

interface ICreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({
  open,
  onClose,
}: ICreateProjectModalProps) {
  const [activeTab, setActiveTab] = useState(0);
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
    },
  });

  const { mutate: saveProject } = useCreateProjectMutation();

  const handleClose = () => {
    methods.reset();
    setActiveTab(0);
    onClose();
  };

  const onSubmit = (data: ICreateProjectForm) => {
    saveProject(
      {
        customerId: data.customerId,
        name: data.name,
        code: data.code,
        timeStart: data.timeStart || undefined,
        timeEnd: data.timeEnd || undefined,
        note: data.note || undefined,
        isAllUserBelongTo: data.isAllUserBelongTo,
        projectType: data.projectType,
        projectTargetUsers: [],
        users: [{ isTemp: false, type: 1, userId: 1 }],
        tasks: [{ taskId: 2, billable: true }],
      },
      {
        onSuccess: (res) => {
          if (res?.success === false) {
            toast.error(res?.error?.message || notify.PROJECT.CREATE_FAILED);
            return;
          }
          toast.success(notify.PROJECT.CREATE_SUCCESS);
          handleClose();
        },
        onError: (err: AxiosError) => {
          const messgaeError = err.response?.data?.error?.message;
          toast.error(messgaeError || notify.CLIENT.CREATE_FAILED);
        },
      },
    );
  };

  return (
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
        <IconButton onClick={handleClose} size="small">
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
                color: '#191515',
                fontWeight: 500,
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#e53935',
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
          </Tabs>
        </Box>
        <DialogContent dividers>
          {activeTab === 0 && <TabGeneral />}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <CustomButton variant="outlined" onClick={handleClose}>
            Cancel
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={methods.handleSubmit(onSubmit)}
            sx={{
              bgcolor: '#e53935',
              '&:hover': { bgcolor: '#c62828' },
            }}
          >
            Save
          </CustomButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
