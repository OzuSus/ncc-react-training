import { useCallback, useState } from 'react';
import type { AlertColor } from '@mui/material';
import type { SnackbarPosition } from '@/libs/components/ui/Snackbar';

export interface Snackbar {
  open: boolean;
  message: string;
  alertColor: AlertColor;
  autoHideDuration?: number;
  position?: SnackbarPosition;
}

const defaultState: Snackbar = {
  open: false,
  message: '',
  alertColor: 'info',
  autoHideDuration: 2000,
};

export default function useSnackbar() {
  const [snackbar, setSnackbar] = useState<Snackbar>(defaultState);
  const show = useCallback(
    (
      alertColor: AlertColor,
      message: string,
      options?: Partial<Omit<Snackbar, 'open' | 'message' | 'alertColor'>>,
    ) => {
      setSnackbar({
        open: true,
        alertColor,
        message,
        autoHideDuration:
          options?.autoHideDuration ?? defaultState.autoHideDuration,
        position: options?.position,
      });
    },
    [],
  );

  const close = useCallback(() => {
    setSnackbar((s) => ({ ...s, open: false }));
  }, []);

  const showSuccess = useCallback(
    (message: string, options?: undefined) => show('success', message, options),
    [show],
  );
  const showError = useCallback(
    (message: string, options?: undefined) => show('error', message, options),
    [show],
  );
  const showInfo = useCallback(
    (message: string, options?: undefined) => show('info', message, options),
    [show],
  );
  const showWarning = useCallback(
    (message: string, options?: undefined) => show('warning', message, options),
    [show],
  );

  return {
    snackbar,
    show,
    close,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
