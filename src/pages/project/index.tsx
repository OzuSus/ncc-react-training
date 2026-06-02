import { useMemo, useState } from 'react';
import { Box, CircularProgress, Container, Paper } from '@mui/material';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { useProjectQuery } from '@/libs/features/project/hooks/useProjectQuery';
import {
  ConfirmType,
  IProject,
  ProjectStatus,
  ToggleActionStatus,
} from '@/libs/features/project/types';
import ProjectGroup from '@/pages/project/sections/ProjectGroup';
import Filter, { statusFilterMap } from '@/pages/project/sections/Filter';
import { useDebounce } from '@/libs/hooks/useDebounce.ts';
import EditProjectModal from '@/pages/project/sections/EditProject';
import ProjectActionsMenu from '@/pages/project/sections/ActionMenu.tsx';
import ViewProjectModal from '@/pages/project/sections/ViewProject';
import CustomSnackbar from '@/libs/components/ui/Snackbar';
import AlertDialog, { type AlertVariant } from '@/libs/components/ui/Alert';
import useSnackbar from '@/libs/hooks/useSnackbar';
import { notify } from '@/libs/constants/notify';
import {
  useActiveProjectMutation,
  useDeleteProjectMutation,
  useInactiveProjectMutation,
} from '@/libs/features/project/hooks/useProjectActionQuery';

export default function ManageProjects() {
  const [actionMenu, setActionMenu] = useState<{
    anchorEl: null;
    projectId: number;
  }>({ anchorEl: null, projectId: null });

  const [projectActionConfirmDialog, setProjectActionConfirmDialog] = useState<{
    open: boolean;
    type: ConfirmType | null;
    projectId: number | null;
  }>({ open: false, type: null, projectId: null });

  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {},
  );
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('active');

  const [editProjectId, setEditProjectId] = useState<number | null>(null);
  const [viewProjectId, setViewProjectId] = useState<number | null>(null);
  const debouncedSearch = useDebounce(searchValue, 500);

  const statusParam = useMemo<number | undefined>(() => {
    return statusFilterMap[statusFilter]?.status;
  }, [statusFilter]);

  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    refetch: refetchProjects,
  } = useProjectQuery({
    status: statusParam,
    search: debouncedSearch,
  });
  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === actionMenu.projectId);
  }, [projects, actionMenu.projectId]);
  const projectActionConfirmProject = useMemo(() => {
    return projects.find((p) => p.id === projectActionConfirmDialog.projectId);
  }, [projects, projectActionConfirmDialog.projectId]);

  const groupedProjects = useMemo(() => {
    const grouped: Record<string, IProject[]> = {};
    for (const project of projects) {
      if (!grouped[project.customerName]) {
        grouped[project.customerName] = [];
      }
      grouped[project.customerName].push(project);
    }
    return Object.entries(grouped).map(([clientName, items]) => ({
      clientId: clientName,
      clientName,
      items,
    }));
  }, [projects]);

  const handleAccordionChange = (clientId: string) => {
    setOpenAccordions((prev) => ({ ...prev, [clientId]: !prev[clientId] }));
  };

  const handleCloseMenu = () => {
    setActionMenu({ anchorEl: null, projectId: null });
  };

  const handleEdit = () => {
    if (actionMenu.projectId != null) setEditProjectId(actionMenu.projectId);
    handleCloseMenu();
  };

  const handleView = () => {
    if (actionMenu.projectId != null) setViewProjectId(actionMenu.projectId);
    handleCloseMenu();
  };

  const { snackbar, showSuccess, showError, close } = useSnackbar();
  const deleteMutation = useDeleteProjectMutation();
  const inactiveMutation = useInactiveProjectMutation();
  const activeMutation = useActiveProjectMutation();
  const isProjectLoading =
    isLoadingProjects ||
    deleteMutation.isPending ||
    inactiveMutation.isPending ||
    activeMutation.isPending;
  const toggleAction: ToggleActionStatus = useMemo(() => {
    if (statusFilter === ToggleActionStatus.Active)
      return ToggleActionStatus.Deactive;
    if (statusFilter === ToggleActionStatus.Deactive)
      return ToggleActionStatus.Active;
    if (!selectedProject) return ToggleActionStatus.Deactive;
    return selectedProject.status === ProjectStatus.Deactive
      ? ToggleActionStatus.Active
      : ToggleActionStatus.Deactive;
  }, [statusFilter, selectedProject]);
  const openProjectActionConfirmDialog = (type: ConfirmType) => {
    setProjectActionConfirmDialog({
      open: true,
      type,
      projectId: actionMenu.projectId,
    });
    handleCloseMenu();
  };

  const closeProjectActionConfirmDialog = () => {
    setProjectActionConfirmDialog({ open: false, type: null, projectId: null });
  };

  const projectActionConfirmConfig = useMemo<{
    text: string;
    variant: AlertVariant;
    confirmText: string;
  }>(() => {
    if (projectActionConfirmDialog.type === ConfirmType.DELETE) {
      return {
        text: notify.CONFIRM.CONFIRM_DELETE,
        variant: 'error',
        confirmText: 'Delete',
      };
    }
    if (projectActionConfirmDialog.type === ConfirmType.INACTIVE) {
      return {
        text: notify.CONFIRM.CONFIRM_DEACTIVE,
        variant: 'warning',
        confirmText: 'Deactive',
      };
    }
    if (projectActionConfirmDialog.type === ConfirmType.ACTIVE) {
      return {
        text: notify.CONFIRM.CONFIRM_ACTIVE,
        variant: 'warning',
        confirmText: 'Active',
      };
    }
    return { text: '', variant: 'info', confirmText: 'Confirm' };
  }, [projectActionConfirmDialog.type, projectActionConfirmProject]);

  const handleProjectActionSuccess = (message: string) => {
    showSuccess(message);
    void refetchProjects();
  };

  const handleProjectActionConfirm = () => {
    const id = projectActionConfirmDialog.projectId;
    if (!projectActionConfirmDialog.type || id == null) return;

    if (projectActionConfirmDialog.type === ConfirmType.DELETE) {
      deleteMutation.mutate(id, {
        onSuccess: () =>
          handleProjectActionSuccess(notify.PROJECT.DELETE_SUCCESS),
        onError: () => showError(notify.PROJECT.DELETE_FAILED),
      });
      return;
    }

    if (projectActionConfirmDialog.type === ConfirmType.INACTIVE) {
      inactiveMutation.mutate(id, {
        onSuccess: () =>
          handleProjectActionSuccess(notify.PROJECT.DEACTIVE_SUCCESS),
        onError: () => showError(notify.PROJECT.DEACTIVE_FAILED),
      });
      return;
    }
    if (projectActionConfirmDialog.type === ConfirmType.ACTIVE) {
      activeMutation.mutate(id, {
        onSuccess: () =>
          handleProjectActionSuccess(notify.PROJECT.ACTIVE_SUCCESS),
        onError: () => showError(notify.PROJECT.ACTIVE_FAILED),
      });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 3, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
              borderBottom: '1px solid #eee',
            }}
          >
            <CustomTypography
              sx={{ fontSize: 16, fontWeight: 600, color: '#222' }}
            >
              Manage Projects
            </CustomTypography>
          </Box>

          <Filter
            selectedValue={statusFilter}
            onSelectFilter={setStatusFilter}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />

          <Box sx={{ px: 2, py: 2, position: 'relative', minHeight: 200 }}>
            {isProjectLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 6,
                }}
              >
                <CircularProgress size={32} />
              </Box>
            ) : (
              groupedProjects.map((group) => (
                <ProjectGroup
                  key={group.clientId}
                  group={group}
                  expanded={!!openAccordions[group.clientId]}
                  onToggle={() => handleAccordionChange(group.clientId)}
                  onOpenActions={(event, projectId) =>
                    setActionMenu({ anchorEl: event.currentTarget, projectId })
                  }
                />
              ))
            )}
          </Box>
        </Paper>
      </Container>
      <ProjectActionsMenu
        anchorEl={actionMenu.anchorEl}
        open={Boolean(actionMenu.anchorEl)}
        onClose={handleCloseMenu}
        onEdit={handleEdit}
        onView={handleView}
        toggleAction={toggleAction}
        onToggle={() => {
          if (actionMenu.projectId == null) return;
          if (toggleAction === ToggleActionStatus.Active)
            openProjectActionConfirmDialog(ConfirmType.ACTIVE);
          else openProjectActionConfirmDialog(ConfirmType.INACTIVE);
        }}
        onDelete={() => openProjectActionConfirmDialog(ConfirmType.DELETE)}
      />
      <EditProjectModal
        open={editProjectId !== null}
        projectId={editProjectId}
        onClose={() => setEditProjectId(null)}
      />
      {viewProjectId !== null && (
        <ViewProjectModal
          open
          projectId={viewProjectId}
          onClose={() => setViewProjectId(null)}
        />
      )}
      <AlertDialog
        open={projectActionConfirmDialog.open}
        text={projectActionConfirmConfig.text}
        variant={projectActionConfirmConfig.variant}
        confirmMode
        confirmText={projectActionConfirmConfig.confirmText}
        cancelText="Cancel"
        onClose={closeProjectActionConfirmDialog}
        onConfirm={handleProjectActionConfirm}
      />
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        alertColor={snackbar.alertColor}
        autoHideDuration={snackbar.autoHideDuration}
        position={snackbar.position}
        onClose={close}
      />
    </Box>
  );
}
