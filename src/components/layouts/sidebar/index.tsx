import { useCallback, useMemo, useState } from 'react';
import { Box, List } from '@mui/material';
import { filterSidebarByPermission, sidebarData } from '@/config/sidebar';
import SidebarItem from './SidebarItem';

type TSidebarProps = {
  permissions?: string[];
};
export default function Sidebar({ permissions = [] }: TSidebarProps) {
  const SidebarData = useMemo(
    () => filterSidebarByPermission(sidebarData, permissions),
    [permissions],
  );

  const [openSideBar, setOpenSideBar] = useState<Record<string, string>>({
    '': SidebarData[0]?.key ?? null,
  });

  const toggle = useCallback((parentKey: string, itemKey: string) => {
    setOpenSideBar((prev) => ({
      ...prev,
      [parentKey]: prev[parentKey] === itemKey ? null : itemKey,
    }));
  }, []);

  return (
    <Box
      sx={{
        width: 280,
        minHeight: '100vh',
        borderRight: '1px solid #d7dbe7',
        bgcolor: 'white',
        pt: 1,
      }}
    >
      <List>
        {SidebarData.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            openSideBar={openSideBar}
            onToggle={toggle}
          />
        ))}
      </List>
    </Box>
  );
}
