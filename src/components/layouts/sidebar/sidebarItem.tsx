import { memo, useCallback, useMemo } from 'react';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { ISidebarItem } from '@/config/sidebar';

interface ISidebarItemProps {
  item: ISidebarItem;
  parentPath?: string;
  level?: number;
  parentKey?: string;
  openSideBar: Record<string, string>;
  onToggle: (parentKey: string, itemKey: string) => void;
}
const isActive = (pathname: string, path?: string) =>
  !!path && (pathname === path || pathname.startsWith(path + '/'));
export function SidebarItem({
  item,
  parentPath = '/app',
  level = 0,
  parentKey = '',
  openSideBar,
  onToggle,
}: ISidebarItemProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const fullPath = useMemo(
    () => (item.path ? `${parentPath}/${item.path}` : `${parentPath}`),
    [item.path, parentPath],
  );
  const hasChildren = useMemo(() => !!item.children?.length, [item.children]);
  const isOpen = useMemo(
    () => openSideBar[parentKey] === item.key,
    [openSideBar, parentKey, item.key],
  );

  const active = useMemo(
    () =>
      hasChildren
        ? item.children.some((child) =>
            isActive(
              pathname,
              child.path ? `${fullPath}/${child.path}` : fullPath,
            ),
          )
        : isActive(pathname, fullPath),
    [hasChildren, item.children, pathname, fullPath],
  );

  const handleClick = useCallback(() => {
    if (hasChildren) {
      onToggle(parentKey, item.key);
      return;
    }
    navigate({ to: fullPath });
  }, [hasChildren, onToggle, parentKey, item.key, navigate, fullPath]);

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          mx: 1,
          mt: 0.5,
          py: 0.9,
          borderRadius: 2,
          pl: 2 + level * 4,
          bgcolor: isOpen ? 'rgba(25,118,210,0.07)' : '',
          '&.Mui-selected': {
            bgcolor: 'rgba(25,118,210,0.08)',
          },
          '&.Mui-selected:hover': {
            bgcolor: 'rgba(25,118,210,0.12)',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 32,
            color: active ? 'primary.main' : 'text.secondary',
          }}
        >
          {item.icon ?? (
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                bgcolor: active ? 'primary.main' : '#9ca3af',
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: 16,
              fontWeight: active ? 500 : 400,
              color: active ? 'primary.main' : 'text.primary',
            },
          }}
        >
          {item.text}
        </ListItemText>
        {hasChildren &&
          (isOpen ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          ))}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List>
            {item.children.map((child) => (
              <SidebarItem
                key={child.key}
                item={child}
                parentPath={fullPath}
                level={level + 1}
                parentKey={item.key}
                openSideBar={openSideBar}
                onToggle={onToggle}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default memo(SidebarItem);
