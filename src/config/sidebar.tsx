import type { ReactNode } from 'react';
import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
import { PERMISSIONS } from '@/app-core/permission/constant.ts';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import GroupIcon from '@mui/icons-material/Group';
import SellIcon from '@mui/icons-material/Sell';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import SettingsAccessibilityRoundedIcon from '@mui/icons-material/SettingsAccessibilityRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import UpdateIcon from '@mui/icons-material/Update';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import EventBusySharpIcon from '@mui/icons-material/EventBusySharp';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
import RuleSharpIcon from '@mui/icons-material/RuleSharp';
import AccessAlarmSharpIcon from '@mui/icons-material/AccessAlarmSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import SupervisedUserCircleSharpIcon from '@mui/icons-material/SupervisedUserCircleSharp';
import RateReviewSharpIcon from '@mui/icons-material/RateReviewSharp';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';

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
    key: 'My profile',
    text: 'My profile',
    path: 'my-profile',
    icon: <AccountBoxIcon />,
    permissions: [PERMISSIONS['MyProfile']],
  },
  {
    key: 'Admin',
    text: 'Admin',
    path: 'admin',
    icon: <GroupWorkIcon />,
    permissions: [PERMISSIONS['Admin']],
    children: [
      {
        key: 'User',
        text: 'User',
        path: 'user',
        icon: <GroupIcon />,
        permissions: [PERMISSIONS['Admin.Users']],
      },
      {
        key: 'Role',
        text: 'Role',
        path: 'role',
        icon: <SellIcon />,
        permissions: [PERMISSIONS['Admin.Roles']],
      },
      {
        key: 'Configuration',
        text: 'Configuration',
        path: 'configuration',
        icon: <SettingsApplicationsIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Client',
        text: 'Client',
        path: 'client',
        icon: <EventNoteSharpIcon />,
        permissions: [PERMISSIONS['Admin.Clients']],
      },
      {
        key: 'Task',
        text: 'Task',
        path: 'task',
        icon: <ImportContactsRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Tasks']],
      },
      {
        key: 'Leave types',
        text: 'Leave types',
        path: 'leave-types',
        icon: <DateRangeRoundedIcon />,
        permissions: [PERMISSIONS['MyAbsenceDay']],
      },
      {
        key: 'Branch',
        text: 'Branch',
        path: 'branch',
        icon: <ApartmentRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Position',
        text: 'Position',
        path: 'position',
        icon: <DescriptionRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Capabilities',
        text: 'Capabilities',
        path: 'capabilities',
        icon: <ViewListRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'capability Setting',
        text: 'capability setting',
        path: 'capability-setting',
        icon: <SettingsAccessibilityRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Off day setting',
        text: 'Off day setting',
        path: 'off-day',
        icon: <DateRangeRoundedIcon />,
        permissions: [PERMISSIONS['DayOff']],
      },
      {
        key: 'Overtime setting',
        text: 'Overtime setting',
        path: 'overtime-setting',
        icon: <AccessTimeRoundedIcon />,
        permissions: [PERMISSIONS['Report.OverTime']],
      },
      {
        key: 'Audit log',
        text: 'Audit log',
        path: 'auditlog',
        icon: <SettingsIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Background job',
        text: 'Background job',
        path: 'background-job',
        icon: <UpdateIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
    ],
  },
  {
    key: 'Project',
    text: 'Projects',
    path: 'projects',
    icon: <AssessmentSharpIcon />,
    permissions: [PERMISSIONS['Project']],
  },
  {
    key: 'My timesheets',
    text: 'My timesheets',
    path: 'home',
    icon: <AccessAlarmIcon />,
    permissions: [PERMISSIONS['MyTimesheet']],
  },
  {
    key: 'Absence Day',
    text: 'My request ',
    path: 'absence-day',
    icon: <EventBusySharpIcon />,
    permissions: [PERMISSIONS['MyAbsenceDay']],
  },
  {
    key: 'My working time',
    text: 'My working time',
    path: 'my-working-time',
    icon: <InsertInvitationSharpIcon />,
    permissions: [PERMISSIONS['MyWorkingTime']],
  },
  {
    key: 'Manage timesheet',
    text: 'Manage timesheet',
    path: 'timesheets',
    icon: <DateRangeRoundedIcon />,
    permissions: [PERMISSIONS['Timesheet']],
  },
  {
    key: 'Manage request absence ',
    text: 'Manage request',
    path: 'off-day-project',
    icon: <RuleSharpIcon />,
    permissions: [PERMISSIONS['Admin.Configuration.WorkingDay']],
  },
  {
    key: 'Manage working time',
    text: 'Manage working time',
    path: 'manage-working-times',
    icon: <AccessAlarmSharpIcon />,
    permissions: [PERMISSIONS['Admin.Configuration.WorkingDay']],
  },
  {
    key: 'Team woringking calender',
    text: 'Team woringking calender',
    path: 'off-day-project-for-user',
    icon: <GroupsSharpIcon />,
    permissions: [PERMISSIONS['MyWorkingTime']],
  },
  {
    key: 'Timesheets monitoring',
    text: 'Timesheets monitoring',
    path: 'timesheets-supervisior',
    icon: <SupervisedUserCircleSharpIcon />,
    permissions: [PERMISSIONS['Admin.Configuration.WorkingDay']],
  },
  {
    key: 'Retro',
    text: 'Retro',
    path: 'retro',
    icon: <EventNoteSharpIcon />,
    permissions: [PERMISSIONS['Retro']],
  },
  {
    key: 'Review intern',
    text: 'Review intern',
    path: 'review',
    icon: <RateReviewSharpIcon />,
    permissions: [PERMISSIONS['Report']],
  },
  {
    key: 'Report',
    text: 'Report',
    path: 'report',
    icon: <DescriptionSharpIcon />,
    permissions: [PERMISSIONS['Report']],
    children: [
      {
        key: 'Intern info',
        text: 'Intern info',
        path: 'interns-info',
        icon: <DescriptionSharpIcon />,
        permissions: [PERMISSIONS['Report.InternsInfo']],
      },
      {
        key: 'Normal working',
        text: 'Normal working',
        path: 'normal-working',
        icon: <WorkOutlineOutlinedIcon />,
        permissions: [PERMISSIONS['Report.NormalWorking']],
      },
      {
        key: 'Over time',
        text: 'Over time',
        path: 'over-time',
        icon: <DateRangeOutlinedIcon />,
        permissions: [PERMISSIONS['Report.NormalWorking']],
      },
      {
        key: 'Tardiness',
        text: 'Tardiness',
        path: 'tardiness-leave-early',
        icon: <WysiwygOutlinedIcon />,
        permissions: [PERMISSIONS['Report.NormalWorking']],
      },
      {
        key: 'Komu tracker',
        text: 'Komu tracker',
        path: 'komu-tracker',
        icon: <AddchartOutlinedIcon />,
        permissions: [PERMISSIONS['Report']],
      },
    ],
  },
];
