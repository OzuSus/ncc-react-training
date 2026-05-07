import { Outlet, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../../features/auth/useAuthStore.ts';

export default function AuthLayout() {
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleLogin = () => {
    setUser({
      id: 1,
      name: 'duoc',
      surname: 'phungvan',
      userName: 'phungvanduoc',
      emailAddress: 'duoc.phungvan@ncc.asia',
    });
    navigate({
      to: '/app/dashboard',
    });
  };

  return (
    <div>
      Login Page
      <button onClick={handleLogin}>Login</button>
      <Outlet />
    </div>
  );
}
