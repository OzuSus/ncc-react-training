import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import CustomSnackbar from '@/libs/components/ui/Snackbar';
import { notify } from '@/libs/constants/notify.ts';
import { useDeleteProjectMutation } from '@/libs/features/project/hooks/useProjectActionQuery.ts';
import { IProject } from '@/libs/features/project/types.ts';
import useSnackbar from '@/libs/hooks/useSnackbar.ts';

interface DeleteProjectModalProps {
  open: boolean;
  project: IProject;
  onClose: () => void;
  onDeleted: () => void;
}

export default function DeleteProjectModal({
  open,
  project,
  onClose,
  onDeleted,
}: DeleteProjectModalProps) {
  const { t } = useTranslation();
  const deleteProjectMutation = useDeleteProjectMutation();
  const { snackbar, showSuccess, showError, close } = useSnackbar();

  const handleClose = () => {
    if (deleteProjectMutation.isPending) return;
    onClose();
  };

  const handleDeleteProject = () => {
    if (!project) return;

    deleteProjectMutation.mutate(project.id, {
      onSuccess: () => {
        showSuccess(notify.PROJECT.DELETE_SUCCESS);
        onDeleted();
        onClose();
      },
      onError: () => showError(notify.PROJECT.DELETE_FAILED),
    });
  };

  const projectName = project?.name || '';
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
            <CancelOutlinedIcon sx={{ fontSize: 88, color: '#dc2626' }} />
            <CustomTypography
              sx={{ fontSize: 22, fontWeight: 700, color: '#1d2630' }}
            >
              {t('project.modals.deleteProject')}
            </CustomTypography>
            <CustomTypography
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: '#666',
                textAlign: 'center',
              }}
            >
              {t('project.modals.confirmDelete', { projectName })}
            </CustomTypography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
          <CustomButton
            variant="outlined"
            onClick={handleClose}
            disabled={deleteProjectMutation.isPending}
            sx={{ minWidth: 100, color: '#555', borderColor: '#ccc' }}
          >
            {t('project.modals.cancel')}
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={handleDeleteProject}
            disabled={deleteProjectMutation.isPending}
            sx={{
              minWidth: 100,
              bgcolor: '#dc2626',
              '&:hover': { bgcolor: '#b91c1c' },
            }}
          >
            {deleteProjectMutation.isPending ? (
              <CircularProgress size={18} sx={{ color: '#fff' }} />
            ) : (
              t('project.modals.delete')
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
