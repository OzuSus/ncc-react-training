import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/useAuthStore.ts';
import { useFetchMeQuery } from '@/features/auth/hooks/useAuthQuery.ts';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const token = Cookies.get('accessToken');
  const { isError } = useFetchMeQuery();

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
    <div>
      <div>Dashboard</div>
      <Outlet />
    </div>
  );
}
