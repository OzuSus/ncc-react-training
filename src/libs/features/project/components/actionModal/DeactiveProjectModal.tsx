import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import CustomSnackbar from '@/libs/components/ui/Snackbar';
import { notify } from '@/libs/constants/notify.ts';
import { useInactiveProjectMutation } from '@/libs/features/project/hooks/useProjectActionQuery.ts';
import { IProject } from '@/libs/features/project/types.ts';
import useSnackbar from '@/libs/hooks/useSnackbar.ts';

interface DeactiveProjectModalProps {
  open: boolean;
  project: IProject | null;
  onClose: () => void;
  onProjectDeactivated: () => void;
}

export default function DeactiveProjectModal({
  open,
  project,
  onClose,
  onProjectDeactivated,
}: DeactiveProjectModalProps) {
  const { t } = useTranslation();
  const deactiveProjectMutation = useInactiveProjectMutation();
  const { snackbar, showSuccess, showError, close } = useSnackbar();
  const projectName = project?.name?.trim() || '';

  const handleClose = () => {
    if (deactiveProjectMutation.isPending) return;
    onClose();
  };

  const handleDeactiveProject = () => {
    if (!project) return;
    deactiveProjectMutation.mutate(project.id, {
      onSuccess: () => {
        showSuccess(notify.PROJECT.DEACTIVE_SUCCESS);
        onProjectDeactivated();
        onClose();
      },
      onError: () => showError(notify.PROJECT.DEACTIVE_FAILED),
    });
  };

  return (
    <>
      <Dialog
        open={open && Boolean(project)}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        sx={{
          '& .MuiDialog-paper': { borderRadius: '12px', px: 1 },
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              py: 1,
            }}
          >
            <ReportOutlinedIcon sx={{ fontSize: 88, color: '#f59e0b' }} />
            <CustomTypography
              sx={{ fontSize: 22, fontWeight: 700, color: '#1d2630' }}
            >
              {t('project.modals.deactiveProject')}
            </CustomTypography>
            <CustomTypography
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: '#666',
                textAlign: 'center',
              }}
            >
              {t('project.modals.confirmDeactive', { projectName })}
            </CustomTypography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
          <CustomButton
            variant="outlined"
            onClick={handleClose}
            disabled={deactiveProjectMutation.isPending}
            sx={{ minWidth: 100, color: '#555', borderColor: '#ccc' }}
          >
            {t('project.modals.cancel')}
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={handleDeactiveProject}
            disabled={deactiveProjectMutation.isPending}
            sx={{
              minWidth: 100,
              bgcolor: '#f59e0b',
              '&:hover': { bgcolor: '#d97706' },
            }}
          >
            {deactiveProjectMutation.isPending ? (
              <CircularProgress size={18} sx={{ color: '#fff' }} />
            ) : (
              t('project.modals.deactive')
            )}
          </CustomButton>
        </DialogActions>
      </Dialog>
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
