import React, { useCallback, useMemo, useState } from 'react';
import { Box, CircularProgress, Collapse } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useController, useFormContext } from 'react-hook-form';
import { CustomTypography } from '@/libs/components/ui/Typography';
import type {
  ICreateProjectForm,
  IProjectMember,
} from '@/pages/project/sections/CreateProject';
import { useMemberQuery } from '@/libs/features/member/hooks/useMemberQuery';
import { useBranchQuery } from '@/libs/features/branch/hooks/useBranchQuery';
import type { IMember, MemberLookupMap } from '@/libs/features/member/types';
import { MemberRole } from '@/libs/features/member/types';
import { useDebounce } from '@/libs/hooks/useDebounce';
import type { BranchFilterValue } from '@/libs/features/branch/types';
import { SelectedMemberRow } from '@/pages/project/sections/CreateProject/Tab/TabTeam/SelectedMemberRow.tsx';
import { AvailableUserRow } from '@/pages/project/sections/CreateProject/Tab/TabTeam/AvailableUserRow.tsx';
import SelectedMemberFilterToolbar from '@/pages/project/sections/CreateProject/Tab/TabTeam/SelectedMemberFilterToolbar.tsx';
import SelectTeamFilterToolbar from '@/pages/project/sections/CreateProject/Tab/TabTeam/SelectTeamFilterToolbar.tsx';

export default function TabTeam() {
  const { control } = useFormContext<ICreateProjectForm>();
  const { field: membersField } = useController({ name: 'members', control });
  const members: IProjectMember[] = membersField.value || [];

  const { data: allMembers = [], isLoading: loadingMembers } = useMemberQuery();
  const { data: branches = [], isLoading: loadingBranches } = useBranchQuery();

  const [showAddPanel, setShowAddPanel] = useState(false);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [showDeactive, setShowDeactive] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [leftSearch, setLeftSearch] = useState('');
  const debouncedLeftSearch = useDebounce(leftSearch, 150);
  const [branchFilter, setBranchFilter] = useState<BranchFilterValue>('all');
  const [typeFilter, setTypeFilter] = useState<number>(-1);
  const [rightSearch, setRightSearch] = useState('');
  const debouncedRightSearch = useDebounce(rightSearch, 150);

  const branchOptions = useMemo(
    () => [
      { id: 'all', name: 'All' },
      ...branches.map((b) => ({ id: b.id, name: b.name })),
    ],
    [branches],
  );

  const memberByIdMap: MemberLookupMap = useMemo(() => {
    const map = new Map<number, IMember>();
    allMembers.forEach((u) => map.set(u.id, u));
    return map;
  }, [allMembers]);

  const selectedIds = useMemo(
    () => new Set(members.map((m) => m.userId)),
    [members],
  );

  const availableMember = useMemo(() => {
    const search = debouncedRightSearch.trim().toLowerCase();
    return allMembers.filter((u) => {
      if (selectedIds.has(u.id)) return false;
      if (branchFilter !== 'all' && u.branchId !== branchFilter) return false;
      if (typeFilter !== -1 && u.type !== typeFilter) return false;
      if (search) {
        const name = (u.name ?? '').toLowerCase();
        const email = (u.emailAddress ?? '').toLowerCase();
        return name.includes(search) || email.includes(search);
      }
      return true;
    });
  }, [allMembers, selectedIds, branchFilter, typeFilter, debouncedRightSearch]);

  const displayMembers = useMemo(() => {
    const search = debouncedLeftSearch.trim().toLowerCase();
    return members.filter((m) => {
      if (!showDeactive && m.type === MemberRole.Deactive) return false;
      if (!showInactive) {
        const user = memberByIdMap.get(m.userId);
        if (user && user.isActive === false) return false;
      }
      if (search) {
        const name = (m.name ?? '').toLowerCase();
        const email = (m.emailAddress ?? '').toLowerCase();
        return name.includes(search) || email.includes(search);
      }
      return true;
    });
  }, [members, showDeactive, showInactive, debouncedLeftSearch, memberByIdMap]);

  const handleAddMember = useCallback(
    (member: IMember) => {
      const newMember: IProjectMember = {
        userId: member.id,
        type: 0,
        isTemp: false,
        name: member.name,
        emailAddress: member.emailAddress,
        avatarFullPath: member.avatarFullPath,
        branchDisplayName: member.branchDisplayName,
        branchColor: member.branchColor,
        userType: member.type,
      };
      membersField.onChange([...members, newMember]);
    },
    [members, membersField],
  );
  const handleRemoveMember = useCallback(
    (userId: number) =>
      membersField.onChange(members.filter((m) => m.userId !== userId)),
    [members, membersField],
  );
  const handleUpdateMember = useCallback(
    (userId: number, key: 'type' | 'isTemp', value: number | boolean) => {
      membersField.onChange(
        members.map((m) => (m.userId === userId ? { ...m, [key]: value } : m)),
      );
    },
    [members, membersField],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        minHeight: 460,
        overflowX: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          borderRight: showAddPanel ? '1px solid #eee' : 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1.5,
            cursor: 'pointer',
          }}
          onClick={() => setLeftOpen((p) => !p)}
        >
          <CustomTypography sx={{ fontSize: 14, fontWeight: 600 }}>
            Selected member
          </CustomTypography>
          {leftOpen ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </Box>
        <Collapse in={leftOpen}>
          <SelectedMemberFilterToolbar
            showDeactive={showDeactive}
            showInactive={showInactive}
            leftSearch={leftSearch}
            showAddPanel={showAddPanel}
            onShowDeactiveChange={setShowDeactive}
            onShowInactiveChange={setShowInactive}
            onSearchChange={setLeftSearch}
            onToggleAddPanel={() => setShowAddPanel((p) => !p)}
          />
          <Box>
            {displayMembers.map((member) => (
              <SelectedMemberRow
                key={member.userId}
                member={member}
                onRemove={handleRemoveMember}
                onUpdate={handleUpdateMember}
              />
            ))}
          </Box>
        </Collapse>
      </Box>
      {showAddPanel && (
        <Box sx={{ flex: '0 0 42%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              cursor: 'pointer',
            }}
            onClick={() => setRightOpen((p) => !p)}
          >
            <CustomTypography sx={{ fontSize: 14, fontWeight: 600 }}>
              Select team member
            </CustomTypography>
            {rightOpen ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </Box>
          <Collapse in={rightOpen}>
            <SelectTeamFilterToolbar
              branchOptions={branchOptions}
              branchFilter={branchFilter}
              typeFilter={typeFilter}
              rightSearch={rightSearch}
              loadingBranches={loadingBranches}
              onBranchChange={setBranchFilter}
              onTypeChange={setTypeFilter}
              onSearchChange={setRightSearch}
            />
            <Box sx={{ overflowY: 'auto' }}>
              {loadingMembers ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress color="inherit" size={24} thickness={4} />
                </Box>
              ) : (
                <Box sx={{ height: 400, position: 'relative' }}>
                  {availableMember.map((user) => (
                    <AvailableUserRow
                      member={user}
                      onAddMember={handleAddMember}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>
        </Box>
      )}
    </Box>
  );
}
