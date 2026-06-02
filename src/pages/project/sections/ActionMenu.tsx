import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomTypography } from '@/libs/components/ui/Typography';

interface ProjectActionsMenuProps {
  anchorEl: null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onView: () => void;
}

export default function ProjectActionsMenu({
  anchorEl,
  open,
  onClose,
  onEdit,
  onView,
}: ProjectActionsMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
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
      <MenuItem onClick={onEdit} sx={{ py: 1 }}>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <EditOutlinedIcon fontSize="small" sx={{ color: '#555' }} />
        </ListItemIcon>
        <CustomTypography sx={{ fontSize: 14 }}>Edit</CustomTypography>
      </MenuItem>

      <MenuItem onClick={onView} sx={{ py: 1 }}>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <VisibilityOutlinedIcon fontSize="small" sx={{ color: '#555' }} />
        </ListItemIcon>
        <CustomTypography sx={{ fontSize: 14 }}>View</CustomTypography>
      </MenuItem>

      <MenuItem onClick={onClose} sx={{ py: 1 }}>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <CloseIcon fontSize="small" sx={{ color: '#555' }} />
        </ListItemIcon>
        <CustomTypography sx={{ fontSize: 14 }}>Deactive</CustomTypography>
      </MenuItem>

      <MenuItem onClick={onClose} sx={{ py: 1 }}>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <CustomTypography sx={{ color: '#dc2626', fontSize: 14 }}>
          Delete
        </CustomTypography>
      </MenuItem>
    </Menu>
  );
}
