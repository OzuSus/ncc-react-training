import { useMemo, useState } from 'react';
import { Box, Container, Paper, CircularProgress } from '@mui/material';

import { CustomTypography } from '@/libs/components/ui/Typography';
import { useProjectQuery } from '@/libs/features/project/hooks/useProjectQuery';
import { IProject } from '@/libs/features/project/types';
import ProjectGroup from '@/pages/project/sections/ProjectGroup';
import Filter, { statusFilterMap } from '@/pages/project/sections/Filter';
import { useDebounce } from '@/libs/hooks/useDebounce.ts';
import EditProjectModal from '@/pages/project/sections/EditProject';
import ProjectActionsMenu, {
  type ToggleAction,
} from '@/pages/project/sections/ActionMenu.tsx';
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

type ConfirmType = 'delete' | 'inactive' | 'active';

export default function ManageProjects() {
  const [actionMenu, setActionMenu] = useState<{
    anchorEl: null;
    projectId: number;
  }>({ anchorEl: null, projectId: null });

  const [confirmDialog, setConfirmDialog] = useState<{
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

  const { data: projects = [], isLoading: isLoadingProjects } = useProjectQuery(
    {
      status: statusParam,
      search: debouncedSearch,
    },
  );
  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === actionMenu.projectId);
  }, [projects, actionMenu.projectId]);

  const groupedProjects = useMemo(() => {
    const grouped: Record<string, IProject[]> = {};
    for (const project of projects) {
      if (!grouped[project.customerName]) grouped[project.customerName] = [];
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

  const handleCloseMenu = () =>
    setActionMenu({ anchorEl: null, projectId: null });

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
  const toggleAction: ToggleAction = useMemo(() => {
    if (statusFilter === 'active') return 'deactive';
    if (statusFilter === 'deactive') return 'active';
    if (!selectedProject) return 'deactive';
    return selectedProject.status === 1 ? 'active' : 'deactive';
  }, [statusFilter, selectedProject]);
  const openConfirm = (type: ConfirmType) => {
    setConfirmDialog({ open: true, type, projectId: actionMenu.projectId });
    handleCloseMenu();
  };

  const confirmConfig = useMemo<{ text: string; variant: AlertVariant }>(() => {
    if (confirmDialog.type === 'delete') {
      return { text: 'Do you want to delete this project?', variant: 'error' };
    }
    if (confirmDialog.type === 'inactive') {
      return {
        text: 'Do you want to deactive this project?',
        variant: 'warning',
      };
    }
    if (confirmDialog.type === 'active') {
      return {
        text: 'Do you want to active this project?',
        variant: 'warning',
      };
    }
    return { text: '', variant: 'info' };
  }, [confirmDialog.type]);

  const handleConfirm = () => {
    const id = confirmDialog.projectId;
    if (!confirmDialog.type || id == null) return;

    if (confirmDialog.type === 'delete') {
      deleteMutation.mutate(id, {
        onSuccess: () => showSuccess(notify.PROJECT.DELETE_SUCCESS),
        onError: () => showError(notify.PROJECT.DELETE_FAILED),
      });
      return;
    }

    if (confirmDialog.type === 'inactive') {
      inactiveMutation.mutate(id, {
        onSuccess: () => showSuccess(notify.PROJECT.DEACTIVE_SUCCESS),
        onError: () => showError(notify.PROJECT.DEACTIVE_FAILED),
      });
      return;
    }
    if (confirmDialog.type === 'active') {
      activeMutation.mutate(id, {
        onSuccess: () => showSuccess(notify.PROJECT.ACTIVE_SUCCESS),
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

          <Box sx={{ px: 2, py: 2 }}>
            {isLoadingProjects ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
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
          if (toggleAction === 'active') openConfirm('active');
          else openConfirm('inactive');
        }}
        onDelete={() => openConfirm('delete')}
      />

      <EditProjectModal
        open={editProjectId !== null}
        projectId={editProjectId}
        onClose={() => setEditProjectId(null)}
      />

      <ViewProjectModal
        open={viewProjectId !== null}
        projectId={viewProjectId}
        onClose={() => setViewProjectId(null)}
      />

      <AlertDialog
        open={confirmDialog.open}
        text={confirmConfig.text}
        variant={confirmConfig.variant}
        confirmMode
        confirmText="Yes"
        cancelText="Cancel"
        onClose={() =>
          setConfirmDialog({ open: false, type: null, projectId: null })
        }
        onConfirm={() => {
          handleConfirm();
          setConfirmDialog({ open: false, type: null, projectId: null });
        }}
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
