import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { Box, Stack, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { CustomTypography } from '@/components/ui/Typography';
import { CustomTextField } from '@/components/ui/TextField';
import { CustomButton } from '@/components/ui/Button';
import { CustomCheckbox } from '@/components/ui/CheckBox';
import { errorMessages } from '@/constants/errors.ts';
import { useAuthMutation } from '@/features/auth/hooks/useAuthQuery.ts';

type TPrefix = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TPrefix>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const authMutation = useAuthMutation();
  const onSubmit = async (values: TPrefix) => {
    setAuthError('');
    try {
      await authMutation.mutateAsync({
        userNameOrEmailAddress: values.email,
        password: values.password,
        rememberClient: values.rememberMe,
      });
      navigate({ to: '/app/home' });
    } catch (err) {
      setAuthError(
        err?.message || errorMessages.AUTH.INCORECT_EMAIL_OR_PASSWORD,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Box>
          <CustomTypography
            sx={{ fontSize: 25, fontWeight: 700, lineHeight: 1.2 }}
          >
            Login
          </CustomTypography>
          {authError ? (
            <CustomTypography
              sx={{ fontSize: 16, fontWeight: 400, color: 'error.main' }}
            >
              {authError}
            </CustomTypography>
          ) : (
            ''
          )}
        </Box>
        <Controller
          name="email"
          control={control}
          rules={{
            required: errorMessages.EMAIL.REQUIRED,
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              type={'text'}
              label="Email or Username"
              placeholder="email or username"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              sx={{
                '& .MuiFormHelperText-root': {
                  ml: 0,
                },
              }}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: errorMessages.PASSWORD.REQUIRED }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              sx={{
                '& .MuiFormHelperText-root': {
                  ml: 0,
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword((v) => !v)}>
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
                label="Keep me sign in"
                checked={field.value}
                onChange={(checked) => field.onChange(checked)}
              />
            )}
          />
        </Box>
        <Box>
          <CustomButton
            type="submit"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: '10px',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Login
          </CustomButton>
        </Box>
      </Stack>
    </form>
  );
}
