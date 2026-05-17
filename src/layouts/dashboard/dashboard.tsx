import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/useAuthStore.ts';
import { useFetchMeQuery } from '@/features/auth/hooks/useAuthQuery.ts';
import Sidebar from '@/components/layouts/sidebar';

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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar permissions={permissions} />
      <div style={{ flex: 1, padding: 16 }}>
        <Outlet />
      </div>
    </div>
  );
}
