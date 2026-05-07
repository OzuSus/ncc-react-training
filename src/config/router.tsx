import { lazy } from 'react';
import { AppRoutesConfig } from '@/app-core/@types/route.ts';
import AuthLayout from '@/layouts/auth';
import { tanstackRouterMapping } from '@/app-core/routing/tanstackRouterMapping.tsx';
import DashboardLayout from '@/layouts/dashboard/dashboard.tsx';

export const routes: AppRoutesConfig[] = [
  {
    prefix: 'app',
    layout: <DashboardLayout />,
    isPrivate: true,
    children: [
      {
        key: 'dashboard',
        path: 'dashboard',
        component: lazy(
          () => import('@/features/components/dashboard/dashboard.tsx'),
        ),
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
        component: lazy(() => import('@/features/components/form/signIn.tsx')),
        authority: [],
      },
    ],
  },
];

export const { router } = tanstackRouterMapping(routes);
