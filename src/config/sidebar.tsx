import type { ReactNode } from 'react';

import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import { PERMISSIONS } from '@/app-core/permission/constant.ts';

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
        permissions: [PERMISSIONS['MyTimesheet.View']],
        children: [
          {
            key: 'teacher-list',
            text: 'List',
            path: 'list',
            permissions: [PERMISSIONS['MyTimesheet.View']],
          },
          {
            key: 'teacher-list',
            text: 'Apply',
            path: 'Apply',
            permissions: [
              PERMISSIONS['Admin.Tasks.AddNew'],
              PERMISSIONS['Admin'],
            ],
          },
          {
            key: 'teacher-add',
            text: 'Add',
            path: 'add',
            permissions: [
              PERMISSIONS['Admin.Tasks.AddNew'],
              PERMISSIONS['Admin'],
            ],
          },
        ],
      },
      {
        key: 'student',
        text: 'Student',
        path: 'student',
        permissions: [PERMISSIONS['MyTimesheet.View']],
        children: [
          {
            key: 'student-list',
            text: 'List',
            path: 'list',
            permissions: [PERMISSIONS['MyTimesheet.View']],
          },
          {
            key: 'student-Apply',
            text: 'Apply',
            path: 'Apply',
            permissions: [PERMISSIONS['MyTimesheet.View']],
          },
          {
            key: 'student-Add',
            text: 'Add',
            path: 'Add',
            permissions: [
              PERMISSIONS['Admin.Tasks.AddNew'],
              PERMISSIONS['Admin'],
            ],
          },
        ],
      },
      {
        key: 'course',
        text: 'Course',
        path: 'course',
        permissions: [PERMISSIONS['MyTimesheet.View']],
        children: [
          {
            key: 'course-view',
            text: 'View',
            path: 'view',
            permissions: [PERMISSIONS['MyTimesheet.View']],
          },
          {
            key: 'course-add',
            text: 'Add',
            path: 'add',
            permissions: [
              PERMISSIONS['Admin.Tasks.AddNew'],
              PERMISSIONS['Admin'],
            ],
          },
        ],
      },
      {
        key: 'pricing',
        text: 'Pricing',
        path: 'pricing',
        permissions: [PERMISSIONS['Retro.View']],
      },
      {
        key: 'site',
        text: 'Site',
        path: 'site',
        permissions: [PERMISSIONS['Retro.ChangeStatus']],
      },
      {
        key: 'setting',
        text: 'Setting',
        path: 'setting',
        permissions: [
          PERMISSIONS['Admin.Users.Edit'],
          PERMISSIONS['Admin.Clients.Edit'],
        ],
      },
    ],
  },
  {
    key: 'membership',
    text: 'Membership',
    icon: <PeopleAltSharpIcon />,
    path: 'membership',
    permissions: [PERMISSIONS['Admin.Tasks.View'], PERMISSIONS['Admin.Roles']],
    children: [
      {
        key: 'membership-dashboard',
        text: 'Dashboard',
        path: 'dashboard',
        permissions: [
          PERMISSIONS['Admin.Tasks.View'],
          PERMISSIONS['Admin.Roles'],
        ],
      },
      {
        key: 'membership-list',
        text: 'List',
        path: 'list',
        permissions: [
          PERMISSIONS['Admin.Tasks.View'],
          PERMISSIONS['Admin.Roles'],
        ],
      },
      {
        key: 'membership-pricing',
        text: 'Pricing',
        path: 'pricing',
        permissions: [
          PERMISSIONS['Admin.Tasks.View'],
          PERMISSIONS['Admin.Roles'],
        ],
      },
      {
        key: 'membership-setting',
        text: 'Setting',
        path: 'setting',
        permissions: [
          PERMISSIONS['Admin.Tasks.View'],
          PERMISSIONS['Admin.Roles'],
        ],
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
