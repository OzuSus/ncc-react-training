import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/libs/features/auth/useAuthStore.ts';
import { useFetchMeQuery } from '@/libs/features/auth/hooks/useAuthQuery.ts';
import Sidebar from '@/libs/components/layouts/sidebar';
import { Box } from '@mui/material';
import Header from '@/libs/components/layouts/header';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const token = Cookies.get('accessToken');
  const { isError } = useFetchMeQuery();
  const { permissions } = useAuthStore();
  useEffect(() => {
    if (!token) {
      logout();
      navigate({ to: '/auth/sign-in' });
    }
  }, [token, logout, navigate]);
  useEffect(() => {
    if (token && isError) {
      logout();
      navigate({ to: '/auth/sign-in' });
    }
  }, [token, isError, logout, navigate]);

  if (!token) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        bgcolor: '#f8f9fa',
      }}
    >
      <Header />
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <Sidebar permissions={permissions} />
        <Box
          component="main"
          sx={{ flex: 1, p: 3, overflow: 'auto', bgcolor: '#f8f9fa' }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
