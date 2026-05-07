import AuthLayout from '../layouts/auth';
// import { DashboardLayout } from './layouts/dashboard/dashboard.tsx';
import { lazy } from 'react';
import { tanstackRouterMapping } from '../app-core/routing/tanstackRouterMapping.tsx';
import DashboardLayout from '../layouts/dashboard/dashboard.tsx';
import { AppRoutesConfig } from '../app-core/@types/route.ts';

export const routes: AppRoutesConfig[] = [
  {
    prefix: 'app',
    layout: <DashboardLayout />,
    isPrivate: true,
    children: [
      {
        key: 'dashboard',
        path: 'dashboard',
        component: lazy(() => import('../layouts/dashboard/dashboard.tsx')),
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
        component: lazy(() => import('../layouts/auth')),
        authority: [],
      },
    ],
  },
];

export const { router } = tanstackRouterMapping(routes);
