import { Alert, Snackbar, type AlertColor } from '@mui/material';

export type SnackbarPosition = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

const defaultPosition: SnackbarPosition = {
  vertical: 'bottom',
  horizontal: 'right',
};

const snackbarColor: Record<AlertColor, string> = {
  success: '#16a34a',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  alertColor?: AlertColor;
  autoHideDuration?: number;
  position?: SnackbarPosition;
  onClose: () => void;
}

export default function CustomSnackbar({
  open,
  message,
  alertColor = 'info',
  autoHideDuration = 2000,
  position = defaultPosition,
  onClose,
}: CustomSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={position}
      sx={{ zIndex: (theme) => theme.zIndex.modal + 999 }}
    >
      <Alert
        variant="filled"
        sx={{
          width: '100%',
          borderRadius: 2,
          fontWeight: 600,
          letterSpacing: 0.2,
          bgcolor: snackbarColor[alertColor],
          color: '#fff',
          boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
          '& .MuiAlert-icon': { color: '#fff', opacity: 0.95 },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
