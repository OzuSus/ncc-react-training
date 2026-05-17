import { ISidebarItem } from '@/config/sidebar.tsx';

const hasPermission = (
  itemPermissions: string[] = [],
  userPermissions: string[],
) => {
  if (!itemPermissions.length) return true;
  return itemPermissions.some((permission) =>
    userPermissions.includes(permission),
  );
};
export const sidebarBuilder = (
  items: ISidebarItem[],
  userPermissions: string[],
): ISidebarItem[] => {
  return items
    .filter((item) => hasPermission(item.permissions, userPermissions))
    .map((item) => ({
      ...item,
      children: item.children
        ? sidebarBuilder(item.children, userPermissions)
        : [],
    }));
};
