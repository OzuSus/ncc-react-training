import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { Box, Stack, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useAuthStore } from '@/features/auth/useAuthStore.ts';
import { CustomTypography } from '@/components/ui/Typography';
import { CustomTextField } from '@/components/ui/TextField';
import { CustomButton } from '@/components/ui/Button';
import { CustomCheckbox } from '@/components/ui/CheckBox';
import { getUserByAuth } from '@/features/mock.ts';

type SignInFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/;

export default function SignIn() {
  const setUser = useAuthStore((s) => s.setUser);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values: SignInFormValues) => {
    setAuthError('');
    const user = getUserByAuth(values.email, values.password);
    if (!user) {
      setAuthError('Email or password is incorrect');
      return;
    }
    setUser({
      id: user.id,
      name: user.name,
      surname: user.surname,
      userName: user.userName,
      emailAddress: user.emailAddress,
    });
    navigate({ to: '/app/home' });
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
            required: 'Email is required',
            pattern: {
              value: emailRegex,
              message: 'Email is not valid',
            },
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              type={'email'}
              label="Email Address"
              placeholder="Email address"
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
          rules={{ required: 'Password is required' }}
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
