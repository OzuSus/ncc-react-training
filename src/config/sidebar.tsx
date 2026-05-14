import type { ReactNode } from 'react';

import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';

export interface ISidebarItem {
  key: string;
  text: string;
  path: string;
  icon?: ReactNode;
  permissions?: string[];
  children?: ISidebarItem[];
}

export const sidebarData: ISidebarItem[] = [
  {
    key: 'online-courses',
    text: 'Online Courses',
    path: '',
    icon: <EventNoteSharpIcon />,
    children: [
      {
        key: 'dashboard',
        text: 'Dashboard',
        path: 'home',
      },
      {
        key: 'teacher',
        text: 'Teacher',
        path: 'teacher',
        permissions: ['MyTimesheet.View'],
        children: [
          {
            key: 'teacher-list',
            text: 'List',
            path: 'list',
            permissions: ['MyTimesheet.View'],
          },
          {
            key: 'teacher-list',
            text: 'Apply',
            path: 'Apply',
            permissions: ['Admin.Tasks.AddNew', 'Admin'],
          },
          {
            key: 'teacher-add',
            text: 'Add',
            path: 'add',
            permissions: ['Admin.Tasks.AddNew', 'Admin'],
          },
        ],
      },
      {
        key: 'student',
        text: 'Student',
        path: 'student',
        permissions: ['MyTimesheet.View'],
        children: [
          {
            key: 'student-list',
            text: 'List',
            path: 'list',
            permissions: ['MyTimesheet.View'],
          },
          {
            key: 'student-Apply',
            text: 'Apply',
            path: 'Apply',
            permissions: ['MyTimesheet.View'],
          },
          {
            key: 'student-Add',
            text: 'Add',
            path: 'Add',
            permissions: ['Admin.Tasks.AddNew', 'Admin'],
          },
        ],
      },
      {
        key: 'course',
        text: 'Course',
        path: 'course',
        permissions: ['MyTimesheet.View'],
        children: [
          {
            key: 'course-view',
            text: 'View',
            path: 'view',
            permissions: ['MyTimesheet.View'],
          },
          {
            key: 'course-add',
            text: 'Add',
            path: 'add',
            permissions: ['Admin.Tasks.AddNew', ''],
          },
        ],
      },
      {
        key: 'pricing',
        text: 'Pricing',
        path: 'pricing',
        permissions: ['Retro.RetroDetail.Import'],
      },
      {
        key: 'site',
        text: 'Site',
        path: 'site',
        permissions: ['Retro.RetroDetail.Import'],
      },
      {
        key: 'setting',
        text: 'Setting',
        path: 'setting',
        permissions: ['Admin.Users.Edit', 'Admin.LeaveTypes.View'],
      },
    ],
  },
  {
    key: 'membership',
    text: 'Membership',
    icon: <PeopleAltSharpIcon />,
    path: 'membership',
    permissions: ['Admin.Tasks.View', 'Admin.Roles'],
    children: [
      {
        key: 'membership-dashboard',
        text: 'Dashboard',
        path: 'dashboard',
        permissions: ['Admin.Tasks.View', 'Admin.Roles'],
      },
      {
        key: 'membership-list',
        text: 'List',
        path: 'list',
        permissions: ['Admin.Tasks.View', 'Admin.Roles'],
      },
      {
        key: 'membership-pricing',
        text: 'Pricing',
        path: 'pricing',
        permissions: ['Admin.Tasks.View', 'Admin.Roles'],
      },
      {
        key: 'membership-setting',
        text: 'Setting',
        path: 'setting',
        permissions: ['Admin.Tasks.View', 'Admin.Roles'],
      },
    ],
  },
];

const hasPermission = (
  itemPermissions: string[] = [],
  userPermissions: string[],
) => {
  if (!itemPermissions.length) return true;
  return itemPermissions.some((permission) =>
    userPermissions.includes(permission),
  );
};
export const filterSidebarByPermission = (
  items: ISidebarItem[],
  userPermissions: string[],
): ISidebarItem[] => {
  return items
    .filter((item) => hasPermission(item.permissions, userPermissions))
    .map((item) => ({
      ...item,
      children: item.children
        ? filterSidebarByPermission(item.children, userPermissions)
        : [],
    }));
};
