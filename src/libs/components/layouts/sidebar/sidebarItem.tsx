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
import { useTranslation } from 'react-i18next';

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
        ? item.children?.some((child) =>
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

  const { t } = useTranslation();

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
          cursor: 'pointer',
          bgcolor: isOpen ? '#f0f5ff' : 'transparent',
          '&:hover': {
            bgcolor:
              hasChildren || level === 0
                ? isOpen
                  ? '#e9f0ff'
                  : '#f3f5f780'
                : 'transparent',
          },
          '&:active': {
            bgcolor:
              hasChildren || level === 0
                ? isOpen
                  ? '#dce8ff'
                  : '#f3f5f7cc'
                : 'transparent',
          },
          '&.Mui-focusVisible': {
            bgcolor:
              isOpen || (active && !hasChildren) ? '#f0f5ff' : 'transparent',
          },
          '& .MuiTouchRipple-ripple .MuiTouchRipple-child': {
            backgroundColor: '#1a8cff !important',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 32,
            color:
              (active && !hasChildren) || isOpen ? '#4680ff' : 'text.secondary',
          }}
        >
          {item.icon ?? (
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                bgcolor: active && !hasChildren ? '#4680ff' : '#9ca3af',
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: 14,
              fontWeight: active ? 500 : 300,
              color: (active && !hasChildren) || isOpen ? '#4680ff' : '#5b6b79',
            },
          }}
        >
          {t(item.text)}
        </ListItemText>
        {hasChildren &&
          (isOpen ? (
            <ExpandLessIcon fontSize="small" sx={{ color: '#4680ff' }} />
          ) : (
            <ExpandMoreIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          ))}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List>
            {item.children?.map((child) => (
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
