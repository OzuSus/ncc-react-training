import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router';
import { AppRoutesConfig } from '@/app-core/@types/route.ts';
import Cookies from 'js-cookie';

const rootRoute = createRootRoute({});
export const tanstackRouterMapping = (routesConfig: AppRoutesConfig[]) => {
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: () => {
      throw redirect({ to: '/auth/sign-in' });
    },
  });

  const allRoutes = routesConfig.map((group) => {
    const layoutRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: group.prefix,
      component: () => group.layout,
      beforeLoad: () => {
        const token = Cookies.get('accessToken');
        if (group.isPrivate && !token) {
          throw redirect({ to: '/auth/sign-in' });
        }
        if (group.prefix === 'auth' && token) {
          throw redirect({ to: '/app/home' });
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

  const routeTree = rootRoute.addChildren([indexRoute, ...allRoutes]);
  const router = createRouter({ routeTree });

  return { router };
};
