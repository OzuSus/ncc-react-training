import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
} from '@tanstack/react-router';
import { useAuthStore } from './features/auth/useAuthStore.ts';
import { AuthLayout } from './layouts/auth';
import { DashboardLayout } from './layouts/dashboard/dashboard.tsx';

const rootRoute = createRootRoute();
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (user) {
      throw redirect({
        to: '/dashboard',
      });
    }
    throw redirect({
      to: '/login',
    });
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (user) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: AuthLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: DashboardLayout,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
]);

export const router = createRouter({ routeTree });
