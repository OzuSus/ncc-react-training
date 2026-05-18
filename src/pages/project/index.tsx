import { useState } from 'react';
import {
  Box,
  Container,
  Divider,
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
import { mockProject } from '@/features/project/mockProject.ts';
import { CustomTypography } from '@/components/ui/Typography';
import { CustomButton } from '@/components/ui/Button';

export default function ManageProjects() {
  const [actionsAnchor, setActionsAnchor] = useState(null);

  return (
    <Box sx={{ minHeight: '100vh', py: 3 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={1}
          sx={{ borderRadius: 3, px: 2, overflow: 'hidden' }}
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
              sx={{ fontSize: 16, fontWeight: 600, color: '#222' }}
            >
              Manage Projects
            </CustomTypography>
          </Box>

          {mockProject.map((group) => (
            <Box key={group.clientId} sx={{ mt: 3 }}>
              <Box
                sx={{
                  background: '#e0e0e0',
                  mx: 2,
                  borderRadius: 2,
                  px: 1,
                  py: 1.2,
                  borderTop: '1px solid #d4d4d4',
                  borderBottom: '1px solid #d4d4d4',
                }}
              >
                <CustomTypography
                  sx={{ fontSize: 16, fontWeight: 600, color: '#222' }}
                >
                  {group.clientName}
                </CustomTypography>
              </Box>
              {group.items.map((project) => (
                <Box key={project.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: 2.5,
                      py: 1.4,
                      gap: 1,
                      '&:hover': { background: '#fafafa' },
                      transition: 'background 0.15s',
                    }}
                  >
                    <CustomTypography
                      sx={{ fontSize: 14, fontWeight: 500, color: '#1D2630' }}
                    >
                      {project.name}
                    </CustomTypography>
                    <CustomBadge
                      badgeVariant="projectManager"
                      label={project.projectManager}
                    />
                    <CustomBadge
                      badgeVariant="members"
                      label={`${project.members} members`}
                    />
                    <CustomBadge badgeVariant="type" label={project.type} />
                    <CustomBadge
                      badgeVariant="rangeDate"
                      label={`${project.startDate} - ${project.endDate}`}
                    />
                    <Box sx={{ flex: 1 }} />
                    <CustomButton
                      size="small"
                      endIcon={
                        <KeyboardArrowDownIcon
                          sx={{ fontSize: '16px !important' }}
                        />
                      }
                      onClick={(e) => setActionsAnchor(e.currentTarget)}
                      variant="text"
                      sx={{
                        color: '#555',
                        fontWeight: 500,
                        fontSize: 13,
                        px: 1.5,
                        mr: 0,
                        border: '1px solid #ddd',
                        borderRadius: 1,
                        minWidth: 90,
                        '&:hover': { background: '#f0f0f0' },
                      }}
                    >
                      Actions
                    </CustomButton>
                    <Menu
                      anchorEl={actionsAnchor}
                      open={Boolean(actionsAnchor)}
                      onClose={() => setActionsAnchor(null)}
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
                      <MenuItem
                        onClick={() => setActionsAnchor(null)}
                        sx={{ py: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <EditOutlinedIcon sx={{ color: '#555' }} />
                        </ListItemIcon>
                        <CustomTypography sx={{ fontSize: 14 }}>
                          Edit
                        </CustomTypography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => setActionsAnchor(null)}
                        sx={{ py: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <VisibilityOutlinedIcon
                            fontSize="small"
                            sx={{ color: '#555' }}
                          />
                        </ListItemIcon>
                        <CustomTypography sx={{ fontSize: 14 }}>
                          View
                        </CustomTypography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => setActionsAnchor(null)}
                        sx={{ py: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <CloseIcon fontSize="small" sx={{ color: '#555' }} />
                        </ListItemIcon>
                        <CustomTypography sx={{ fontSize: 14 }}>
                          Deactive
                        </CustomTypography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => setActionsAnchor(null)}
                        sx={{ py: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <CustomTypography
                          sx={{ color: '#dc2626', fontSize: 14 }}
                        >
                          Delete
                        </CustomTypography>
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Divider sx={{ mx: 3 }} />
                </Box>
              ))}
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  );
}
