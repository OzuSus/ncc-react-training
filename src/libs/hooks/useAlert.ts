import { useCallback, useState } from 'react';
import { AlertVariant } from '@/libs/components/ui/Alert';

interface Alert {
  open: boolean;
  text: string;
  variant: AlertVariant;
}

export function useAlertDialog() {
  const [alert, setAlert] = useState<Alert>({
    open: false,
    text: '',
    variant: 'error',
  });

  const showAlert = useCallback(
    (text: string, variant: AlertVariant = 'error') => {
      setAlert({ open: true, text, variant });
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAlert((prev) => ({ ...prev, open: false }));
  }, []);

  return { alert, showAlert, handleClose };
}
