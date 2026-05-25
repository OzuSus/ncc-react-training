import React, { useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { CustomTextField } from '@/libs/components/ui/TextField';
import { useCreateClientMutation } from '@/libs/features/client/hook/useClientQuery.ts';
import { errorMessages } from '@/libs/constants/errors.ts';
import { notify } from '@/libs/constants/notify.ts';
import type { AxiosError } from 'axios';

interface IAddClientModalProps {
  open: boolean;
  onClose: () => void;
}

interface IAddClientForm {
  name: string;
  code: string;
  address: string;
}

export default function AddClientModal({
  open,
  onClose,
}: IAddClientModalProps) {
  const { mutate: createClient } = useCreateClientMutation();
  const { control, handleSubmit, reset } = useForm<IAddClientForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { name: '', code: '', address: '' },
  });
  const handleClose = () => {
    reset({ name: '', code: '', address: '' });
    onClose();
  };
  useEffect(() => {
    if (open) reset({ name: '', code: '', address: '' });
  }, [open, reset]);
  const onSubmit = (data: IAddClientForm) => {
    const payload = {
      name: data.name.trim(),
      code: data.code.trim(),
      address: data.address?.trim() || '',
    };
    createClient(payload, {
      onSuccess: (res) => {
        if (res?.success === false) {
          toast.error(res?.error?.message || notify.CLIENT.CREATE_FAILED);
          return;
        }
        toast.success(notify.CLIENT.CREATE_SUCCESS);
        handleClose();
      },
      onError: (err: AxiosError) => {
        const messgaeError = err.response?.data?.error?.message;
        toast.error(messgaeError || notify.CLIENT.CREATE_FAILED);
      },
    });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{
        '&& .MuiDialog-paper': {
          borderRadius: '16px !important',
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 600,
        }}
      >
        New Client
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: '8px !important' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <CustomTypography sx={{ fontSize: 16, color: '#5B6B79', mb: 0.5 }}>
              Name <span style={{ color: '#e53935' }}>*</span>
            </CustomTypography>
            <Controller
              name="name"
              control={control}
              rules={{
                validate: (v) => (v.trim() ? true : errorMessages.CLIENT.NAME),
              }}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  size={'small'}
                  placeholder={'Enter client name'}
                  sx={{
                    '& .MuiInputBase-root': {
                      minHeight: '45px',
                      color: '#1d2630',
                      fontSize: 14,
                    },
                    '& .MuiFormHelperText-root': { ml: 0 },
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <CustomTypography sx={{ fontSize: 16, color: '#5B6B79', mb: 0.5 }}>
              Code <span style={{ color: '#e53935' }}>*</span>
            </CustomTypography>
            <Controller
              name="code"
              control={control}
              rules={{
                validate: (v) => (v.trim() ? true : errorMessages.CLIENT.CODE),
              }}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  size={'small'}
                  placeholder={'Enter client code'}
                  sx={{
                    '& .MuiInputBase-root': {
                      minHeight: '45px',
                      color: '#1d2630',
                      fontSize: 14,
                    },
                    '& .MuiFormHelperText-root': { ml: 0 },
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <CustomTypography sx={{ fontSize: 16, color: '#5B6B79', mb: 0.5 }}>
              Address
            </CustomTypography>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  size={'small'}
                  placeholder={'Enter address'}
                  sx={{
                    '& .MuiInputBase-root': {
                      minHeight: '45px',
                      color: '#1d2630',
                      fontSize: 14,
                    },
                    '& .MuiFormHelperText-root': { ml: 0 },
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <CustomButton variant="outlined" onClick={handleClose} size="small">
          Cancel
        </CustomButton>
        <CustomButton
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          size="small"
          sx={{
            bgcolor: '#4680ff',
            '&:hover': { bgcolor: '#3f78ff' },
            boxShadow: 'none',
          }}
        >
          Save
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
