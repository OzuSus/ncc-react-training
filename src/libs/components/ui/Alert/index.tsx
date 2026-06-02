import React from 'react';
import { Dialog, DialogContent, DialogActions, Box } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';

export type AlertVariant = 'error' | 'warning' | 'success' | 'info';

interface IAlertDialogProps {
  open: boolean;
  text: string;
  variant?: AlertVariant;
  onClose: () => void;
}

const variantConfig: Record<
  AlertVariant,
  { icon: React.ReactNode; color: string }
> = {
  error: {
    icon: <HighlightOffOutlinedIcon sx={{ fontSize: 100, color: '#f44336' }} />,
    color: '#f44336',
  },
  warning: {
    icon: <WarningAmberOutlinedIcon sx={{ fontSize: 100, color: '#ff9800' }} />,
    color: '#ff9800',
  },
  success: {
    icon: (
      <CheckCircleOutlineOutlinedIcon
        sx={{ fontSize: 100, color: '#4caf50' }}
      />
    ),
    color: '#4caf50',
  },
  info: {
    icon: <InfoOutlinedIcon sx={{ fontSize: 100, color: '#2196f3' }} />,
    color: '#2196f3',
  },
};

export default function AlertDialog({
  open,
  text,
  variant = 'error',
  onClose,
}: IAlertDialogProps) {
  const config = variantConfig[variant];
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        zIndex: 9999,
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
          {config.icon}
          <CustomTypography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              color: '#1d2630',
              textAlign: 'center',
            }}
          >
            {text}
          </CustomTypography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <CustomButton
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: config.color,
            '&:hover': { bgcolor: config.color },
            minWidth: 80,
          }}
        >
          OK
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
