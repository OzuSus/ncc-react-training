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

type TSidebarItemProps = {
  item: ISidebarItem;
  parentPath?: string;
  level?: number;
  parentKey?: string;
  openSideBar: Record<string, string>;
  onToggle: (parentKey: string, itemKey: string) => void;
};
const isActive = (pathname: string, path?: string) =>
  !!path && (pathname === path || pathname.startsWith(path + '/'));
export default function SidebarItem({
  item,
  parentPath = '/app',
  level = 0,
  parentKey = '',
  openSideBar,
  onToggle,
}: TSidebarItemProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const fullPath = item.path ? `${parentPath}/${item.path}` : `${parentPath}`;
  const hasChildren = !!item.children?.length;
  const isOpen = openSideBar[parentKey] === item.key;

  const active = hasChildren
    ? item.children.some((child) =>
        isActive(pathname, child.path ? `${fullPath}/${child.path}` : fullPath),
      )
    : isActive(pathname, fullPath);

  return (
    <>
      <ListItemButton
        onClick={() =>
          hasChildren
            ? onToggle(parentKey, item.key)
            : fullPath && navigate({ to: fullPath })
        }
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
