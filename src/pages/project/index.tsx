import { useMemo, useState } from 'react';
import { Box, Container, Paper, CircularProgress } from '@mui/material';

import { CustomTypography } from '@/libs/components/ui/Typography';
import { useProjectQuery } from '@/libs/features/project/hooks/useProjectQuery';
import { IProject } from '@/libs/features/project/types';
import ProjectGroup from '@/pages/project/sections/ProjectGroup';
import Filter, { statusFilterMap } from '@/pages/project/sections/Filter';
import { useDebounce } from '@/libs/hooks/useDebounce.ts';
import EditProjectModal from '@/pages/project/sections/EditProject';
import ProjectActionsMenu from '@/pages/project/sections/ActionMenu.tsx';

export default function ManageProjects() {
  const [actionMenu, setActionMenu] = useState({
    anchorEl: null,
    projectId: null,
  });
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {},
  );
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('active');

  const [editProjectId, setEditProjectId] = useState(null);
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
    setOpenAccordions((prev) => ({
      ...prev,
      [clientId]: !prev[clientId],
    }));
  };
  const handleCloseMenu = () => {
    setActionMenu({ anchorEl: null, projectId: null });
  };
  const handleEdit = () => {
    setEditProjectId(actionMenu.projectId);
    handleCloseMenu();
  };
  return (
    <Box sx={{ minHeight: '100vh', py: 3, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
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
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: '#222',
              }}
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
      />
      <EditProjectModal
        open={editProjectId !== null}
        projectId={editProjectId}
        onClose={() => setEditProjectId(null)}
      />
    </Box>
  );
}
