import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import type { AppRoutesConfig } from './routeConfig';

const rootRoute = createRootRoute({});
export const tanstackRouterMapping = (routesConfig: AppRoutesConfig[]) => {
  const allRoutes = routesConfig.map((group) => {
    const layoutRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: group.prefix,
      component: () => group.layout,
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
