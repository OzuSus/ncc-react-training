import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, List } from '@mui/material';
import { sidebarData } from '@/config/sidebar';
import SidebarItem from './SidebarItem';
import { sidebarBuilder } from '@/app-core/permission/helper.ts';
import { useRouterState } from '@tanstack/react-router';

type OpenMenuMap = Record<string, string>;

type TSidebarProps = {
  permissions?: string[];
};

export default function Sidebar({ permissions = [] }: TSidebarProps) {
  const menuItems = useMemo(
    () => sidebarBuilder(sidebarData, permissions),
    [permissions],
  );

  const currentPath = useRouterState({
    select: (s) => s.location.pathname,
  });

  const findMenusToOpen = useCallback(
    (
      items: typeof menuItems,
      parentPath = '/app',
      parentKey = '',
    ): OpenMenuMap => {
      const result: OpenMenuMap = {};

      for (const item of items) {
        const itemPath = item.path ? `${parentPath}/${item.path}` : parentPath;

        if (!item.children?.length) continue;

        const hasActiveChild = item.children.some((child) => {
          const childPath = child.path ? `${itemPath}/${child.path}` : itemPath;
          return (
            currentPath === childPath || currentPath.startsWith(childPath + '/')
          );
        });

        if (hasActiveChild) {
          result[parentKey] = item.key;
        }

        const nestedResult = findMenusToOpen(item.children, itemPath, item.key);
        Object.assign(result, nestedResult);
      }

      return result;
    },
    [currentPath],
  );

  const [openMenuMap, setOpenMenuMap] = useState<OpenMenuMap>(() =>
    findMenusToOpen(menuItems),
  );

  useEffect(() => {
    setOpenMenuMap((prev) => ({
      ...prev,
      ...findMenusToOpen(menuItems),
    }));
  }, [currentPath]);

  const toggleMenu = useCallback((parentKey: string, itemKey: string) => {
    setOpenMenuMap((prev) => {
      const isCurrentlyOpen = prev[parentKey] === itemKey;
      if (isCurrentlyOpen) {
        const next = { ...prev };
        delete next[parentKey];
        return next;
      }
      return { ...prev, [parentKey]: itemKey };
    });
  }, []);

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #d7dbe7',
        bgcolor: 'white',
        position: 'sticky',
        top: 0,
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          pt: 1,
          pb: 2,
          px: 2,
        }}
      >
        <Box
          component="img"
          src="https://cdn.mezon.ai/1831515885068619776/2055144527219396608.png"
          alt="Logo"
          sx={{
            width: 100,
            height: 'auto',
            objectFit: 'contain',
            mr: 'auto',
            mt: 2,
            pl: 2,
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: 10 },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'transparent',
            border: '2px solid transparent',
            backgroundClip: 'content-box',
          },
          '&:hover::-webkit-scrollbar-thumb': { bgcolor: '#00000026' },
          '&:hover::-webkit-scrollbar-thumb:hover': { bgcolor: '#00000040' },
        }}
      >
        <List sx={{ pt: 0 }}>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              openSideBar={openMenuMap}
              onToggle={toggleMenu}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
}
