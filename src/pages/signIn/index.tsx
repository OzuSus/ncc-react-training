import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { Box, Stack, IconButton, CircularProgress } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { CustomTextField } from '@/libs/components/ui/TextField';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomCheckbox } from '@/libs/components/ui/CheckBox';
import { useAuthMutation } from '@/libs/features/auth/hooks/useAuthQuery.ts';
import { ErrorAlert } from '@/libs/components/share/errorNotify';

interface IPrefix {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string>('');

  const { mutateAsync: login, isPending } = useAuthMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPrefix>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values: IPrefix) => {
    setAuthError('');
    try {
      await login({
        userNameOrEmailAddress: values.email,
        password: values.password,
        rememberClient: values.rememberMe,
      });
      navigate({ to: '/app/home' });
    } catch (err) {
      console.error(err);
      setAuthError(t('auth.errors.invalidCredentials'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Box>
          <CustomTypography
            sx={{ fontSize: 25, fontWeight: 700, lineHeight: 1.2 }}
          >
            {t('auth.login')}
          </CustomTypography>
        </Box>
        <Controller
          name="email"
          control={control}
          rules={{
            required: t('auth.errors.emailRequired'),
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              type={'text'}
              label={t('auth.emailOrUsername')}
              placeholder={t('auth.emailOrUsernamePlaceholder')}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              disabled={isPending}
              sx={{ '& .MuiFormHelperText-root': { ml: 0 } }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: t('auth.errors.passwordRequired') }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label={t('auth.password')}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth.passwordPlaceholder')}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              disabled={isPending}
              sx={{
                '& .MuiFormHelperText-root': {
                  ml: 0,
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={isPending}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  ),
                },
              }}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <Box>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <CustomCheckbox
                label={t('auth.keepMeSignIn')}
                checked={field.value}
                onChange={(checked) => field.onChange(checked)}
                disabled={isPending}
              />
            )}
          />
        </Box>
        <ErrorAlert message={authError} />
        <Box>
          <CustomButton
            type="submit"
            fullWidth
            disabled={isPending}
            startIcon={
              isPending ? (
                <CircularProgress size={16} sx={{ color: '#fff' }} />
              ) : undefined
            }
            sx={{
              py: 1.5,
              borderRadius: '10px',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {t('auth.login')}
          </CustomButton>
        </Box>
      </Stack>
    </form>
  );
}
