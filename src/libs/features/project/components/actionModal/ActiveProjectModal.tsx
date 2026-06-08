import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import CustomSnackbar from '@/libs/components/ui/Snackbar';
import { notify } from '@/libs/constants/notify.ts';
import { useActiveProjectMutation } from '@/libs/features/project/hooks/useProjectActionQuery.ts';
import { IProject } from '@/libs/features/project/types.ts';
import useSnackbar from '@/libs/hooks/useSnackbar.ts';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';

interface ActiveProjectModalProps {
  open: boolean;
  project: IProject;
  onClose: () => void;
  onProjectActivated: () => void;
}

export default function ActiveProjectModal({
  open,
  project,
  onClose,
  onProjectActivated,
}: ActiveProjectModalProps) {
  const { t } = useTranslation();
  const activeProjectMutation = useActiveProjectMutation();
  const { snackbar, showSuccess, showError, close } = useSnackbar();
  const projectName = project?.name?.trim() || '';

  const handleClose = () => {
    if (activeProjectMutation.isPending) return;
    onClose();
  };

  const handleActiveProject = () => {
    if (!project) return;
    activeProjectMutation.mutate(project.id, {
      onSuccess: () => {
        showSuccess(notify.PROJECT.ACTIVE_SUCCESS);
        onProjectActivated();
        onClose();
      },
      onError: () => showError(notify.PROJECT.ACTIVE_FAILED),
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
              {t('project.modals.activeProject')}
            </CustomTypography>
            <CustomTypography
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: '#666',
                textAlign: 'center',
              }}
            >
              {t('project.modals.confirmActive', { projectName })}
            </CustomTypography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
          <CustomButton
            variant="outlined"
            onClick={handleClose}
            disabled={activeProjectMutation.isPending}
            sx={{ minWidth: 100, color: '#555', borderColor: '#ccc' }}
          >
            {t('project.modals.cancel')}
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={handleActiveProject}
            disabled={activeProjectMutation.isPending}
            sx={{
              minWidth: 100,
              bgcolor: '#f59e0b',
              '&:hover': { bgcolor: '#d97706' },
            }}
          >
            {activeProjectMutation.isPending ? (
              <CircularProgress size={18} sx={{ color: '#fff' }} />
            ) : (
              t('project.modals.active')
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
