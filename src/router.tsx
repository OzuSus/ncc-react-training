import AuthLayout from './layouts/auth';
// import { DashboardLayout } from './layouts/dashboard/dashboard.tsx';
import { lazy } from 'react';
import type { AppRoutesConfig } from './config/routeConfig.ts';
import { tanstackRouterMapping } from './config/tanstackRouterMapping.tsx';
import DashboardLayout from './layouts/dashboard/dashboard.tsx';

export const routes: AppRoutesConfig[] = [
  {
    prefix: 'app',
    layout: <DashboardLayout />,
    isPrivate: true,
    children: [
      {
        key: 'dashboard',
        path: 'dashboard',
        component: lazy(() => import('./layouts/dashboard/dashboard.tsx')),
        authority: [],
        crumb: 'Dashboarddddd',
      },
    ],
  },
  {
    prefix: 'auth',
    layout: <AuthLayout />,
    children: [
      {
        key: 'sign-in',
        path: 'sign-in',
        component: lazy(() => import('./layouts/auth')),
        authority: [],
      },
    ],
  },
];

export const { router } = tanstackRouterMapping(routes);
