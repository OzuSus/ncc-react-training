import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomBadge from '@/components/ui/Badge';
import { CustomTypography } from '@/components/ui/Typography';
import { CustomButton } from '@/components/ui/Button';
import { useProjectQuery } from '@/features/project/hooks/useProjectQuerry.ts';
import {
  IProject,
  useProjectStore,
} from '@/features/project/useProjectStore.ts';
import { formatDateUKType } from '@/utils/date/formatDateUKType.ts';
import { PROJECT_TYPE } from '@/constants/projectType.ts';

export default function ManageProjects() {
  useProjectQuery();
  const projects = useProjectStore((state) => state.projects);
  const [actionsAnchor, setActionsAnchor] = useState(null);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {},
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
    setActionsAnchor(null);
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
          <Box sx={{ px: 2, py: 2 }}>
            {groupedProjects.map((group, groupIndex) => (
              <Accordion
                key={group.clientId}
                elevation={0}
                expanded={!!openAccordions[group.clientId]}
                onChange={() => handleAccordionChange(group.clientId)}
                sx={{
                  mb: groupIndex < groupedProjects.length - 1 ? 2 : 0,
                  background: 'transparent',
                  '&::before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin:
                      groupIndex < groupedProjects.length - 1
                        ? '0 0 16px 0'
                        : 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    background: '#e0e0e0',
                    borderRadius: 2,
                    px: 2,
                    minHeight: '48px !important',
                    height: 48,
                    '&.Mui-expanded': {
                      minHeight: '48px !important',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: '0 !important',
                      display: 'flex',
                      alignItems: 'center',
                    },
                    '& .MuiAccordionSummary-content.Mui-expanded': {
                      margin: '0 !important',
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      alignSelf: 'center',
                    },
                  }}
                >
                  <CustomTypography
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#222',
                    }}
                  >
                    {group.clientName}
                  </CustomTypography>
                </AccordionSummary>
                {openAccordions[group.clientId] && (
                  <AccordionDetails
                    sx={{
                      px: 0,
                      py: 0,
                      border: '1px solid #e0e0e0',
                      borderTop: 'none',
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    {group.items.map((project, index) => (
                      <Box
                        key={project.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          px: 2,
                          py: 1.5,
                          gap: 1,
                          borderBottom:
                            index < group.items.length - 1
                              ? '1px solid #f0f0f0'
                              : 'none',
                          '&:hover': {
                            background: '#fafafa',
                          },
                          transition: 'background 0.15s',
                        }}
                      >
                        <CustomTypography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: '#1D2630',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {project.name}
                        </CustomTypography>
                        <CustomBadge
                          badgeVariant="projectManager"
                          label={project.pms.join(', ')}
                        />

                        <CustomBadge
                          badgeVariant="members"
                          label={`${project.activeMember} members`}
                        />
                        <CustomBadge
                          badgeVariant="type"
                          label={PROJECT_TYPE[project.projectType]}
                        />
                        <CustomBadge
                          badgeVariant="rangeDate"
                          label={`${formatDateUKType(project.timeStart)} - ${formatDateUKType(project.timeEnd)}`}
                        />
                        <Box sx={{ flex: 1 }} />
                        <CustomButton
                          size="small"
                          endIcon={
                            <KeyboardArrowDownIcon
                              sx={{
                                fontSize: '16px !important',
                              }}
                            />
                          }
                          onClick={(e) => setActionsAnchor(e.currentTarget)}
                          variant="text"
                          sx={{
                            color: '#555',
                            fontWeight: 500,
                            fontSize: 13,
                            px: 1.5,
                            border: '1px solid #ddd',
                            borderRadius: 1,
                            minWidth: 90,
                            flexShrink: 0,
                            '&:hover': {
                              background: '#f0f0f0',
                            },
                          }}
                        >
                          Actions
                        </CustomButton>
                      </Box>
                    ))}
                  </AccordionDetails>
                )}
              </Accordion>
            ))}
          </Box>
        </Paper>
      </Container>

      <Menu
        anchorEl={actionsAnchor}
        open={Boolean(actionsAnchor)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            sx: {
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              minWidth: 128,
              mt: 0.5,
              boxShadow: '0px 2px 6px rgba(0,0,0,0.01)',
            },
          },
        }}
      >
        <MenuItem onClick={handleCloseMenu} sx={{ py: 1 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <EditOutlinedIcon fontSize="small" sx={{ color: '#555' }} />
          </ListItemIcon>
          <CustomTypography sx={{ fontSize: 14 }}>Edit</CustomTypography>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ py: 1 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <VisibilityOutlinedIcon fontSize="small" sx={{ color: '#555' }} />
          </ListItemIcon>
          <CustomTypography sx={{ fontSize: 14 }}>View</CustomTypography>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ py: 1 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <CloseIcon fontSize="small" sx={{ color: '#555' }} />
          </ListItemIcon>
          <CustomTypography sx={{ fontSize: 14 }}>Deactive</CustomTypography>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ py: 1 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <DeleteIcon
              fontSize="small"
              sx={{
                color: '#dc2626',
              }}
            />
          </ListItemIcon>
          <CustomTypography
            sx={{
              color: '#dc2626',
              fontSize: 14,
            }}
          >
            Delete
          </CustomTypography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
