import { Outlet } from '@tanstack/react-router';

export default function AuthLayout() {
  return (
    <div>
      Login Page
      <Outlet />
    </div>
  );
}
