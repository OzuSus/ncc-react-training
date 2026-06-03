import { useMemo, useState } from 'react';
import { Box, CircularProgress, Container, Paper } from '@mui/material';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { useProjectQuery } from '@/libs/features/project/hooks/useProjectQuery';
import {
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
import DeleteProjectModal from '@/libs/features/project/components/actionModal/DeleteProjectModal.tsx';
import ActiveProjectModal from '@/libs/features/project/components/actionModal/ActiveProjectModal.tsx';
import DeactiveProjectModal from '@/libs/features/project/components/actionModal/DeactiveProjectModal.tsx';

export default function ManageProjects() {
  const [actionMenu, setActionMenu] = useState<{
    anchorEl: null;
    projectId: number;
  }>({ anchorEl: null, projectId: null });

  const [deleteProject, setDeleteProject] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [deactiveProject, setDeactiveProject] = useState(null);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {},
  );
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('active');

  const [editProjectId, setEditProjectId] = useState(null);
  const [viewProjectId, setViewProjectId] = useState(null);
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

  const refetchProjectList = () => {
    refetchProjects();
  };

  const handleOpenDeleteProjectModal = () => {
    if (!selectedProject) return;
    setDeleteProject(selectedProject);
    handleCloseMenu();
  };

  const handleOpenChangeProjectStatusModal = () => {
    if (!selectedProject) return;
    if (toggleAction === ToggleActionStatus.Active) {
      setActiveProject(selectedProject);
    } else {
      setDeactiveProject(selectedProject);
    }
    handleCloseMenu();
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
            {isLoadingProjects ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
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
        onToggle={handleOpenChangeProjectStatusModal}
        onDelete={handleOpenDeleteProjectModal}
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
      <DeleteProjectModal
        open={deleteProject !== null}
        project={deleteProject}
        onClose={() => setDeleteProject(null)}
        onDeleted={refetchProjectList}
      />
      <ActiveProjectModal
        open={activeProject !== null}
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onProjectActivated={refetchProjectList}
      />
      <DeactiveProjectModal
        open={deactiveProject !== null}
        project={deactiveProject}
        onClose={() => setDeactiveProject(null)}
        onProjectDeactivated={refetchProjectList}
      />
    </Box>
  );
}
