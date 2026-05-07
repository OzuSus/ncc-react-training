import { Outlet } from '@tanstack/react-router';

export default function DashboardLayout() {
  return (
    <div>
      <div>Dashboard</div>
      <Outlet />
    </div>
  );
}
