/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType, LazyExoticComponent } from 'react';

export type RouteConfig = {
  key: string;
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
  authority: string[];
  crumb?: string;
};

export type AppRoutesConfig = {
  prefix: string;
  layout: JSX.Element;
  children: RouteConfig[];
  isPrivate?: boolean;
};
