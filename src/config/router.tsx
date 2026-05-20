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
        key: 'home',
        path: 'home',
        component: lazy(() => import('@/pages/home')),
        authority: [],
        crumb: 'Homeeee',
      },
      {
        key: 'projects',
        path: 'projects',
        component: lazy(() => import('@/pages/project')),
        authority: [],
        crumb: 'project',
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
        component: lazy(() => import('@/pages/signIn')),
        authority: [],
      },
    ],
  },
];

export const { router } = tanstackRouterMapping(routes);
