import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/useAuthStore.ts';
import { AppRoutesConfig } from '@/app-core/@types/route.ts';

const rootRoute = createRootRoute({});
export const tanstackRouterMapping = (routesConfig: AppRoutesConfig[]) => {
  const allRoutes = routesConfig.map((group) => {
    const layoutRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: group.prefix,
      component: () => group.layout,
      beforeLoad: () => {
        const { user } = useAuthStore.getState();
        if (group.isPrivate && !user) {
          throw redirect({
            to: '/auth/sign-in',
          });
        }
        if (group.prefix === 'auth' && user) {
          throw redirect({
            to: '/app/dashboard',
          });
        }
      },
    });

    const childRoutes = group.children.map((child) => {
      return createRoute({
        getParentRoute: () => layoutRoute,
        path: child.path,
        component: child.component,
      });
    });
    return layoutRoute.addChildren(childRoutes);
  });

  const routeTree = rootRoute.addChildren(allRoutes);
  const router = createRouter({ routeTree });

  return { router };
};
