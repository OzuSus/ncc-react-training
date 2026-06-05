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
    text: 'sidebar.myProfile',
    path: 'my-profile',
    icon: <AccountBoxIcon />,
    permissions: [PERMISSIONS['MyProfile']],
  },
  {
    key: 'Admin',
    text: 'sidebar.admin',
    path: 'admin',
    icon: <GroupWorkIcon />,
    permissions: [PERMISSIONS['Admin']],
    children: [
      {
        key: 'User',
        text: 'sidebar.user',
        path: 'user',
        icon: <GroupIcon />,
        permissions: [PERMISSIONS['Admin.Users']],
      },
      {
        key: 'Role',
        text: 'sidebar.role',
        path: 'role',
        icon: <SellIcon />,
        permissions: [PERMISSIONS['Admin.Roles']],
        children: [
          {
            key: 'My working time',
            text: 'sidebar.myWorkingTime',
            path: 'my-working-time',
            icon: <InsertInvitationSharpIcon />,
            permissions: [PERMISSIONS['MyWorkingTime']],
          },
          {
            key: 'Manage timesheet',
            text: 'sidebar.manageTimesheet',
            path: 'timesheets',
            icon: <DateRangeRoundedIcon />,
            permissions: [PERMISSIONS['Timesheet']],
          },
          {
            key: 'Manage request absence ',
            text: 'sidebar.manageRequest',
            path: 'off-day-project',
            icon: <RuleSharpIcon />,
            permissions: [PERMISSIONS['Admin.Configuration.WorkingDay']],
          },
        ],
      },
      {
        key: 'Configuration',
        text: 'sidebar.configuration',
        path: 'configuration',
        icon: <SettingsApplicationsIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Client',
        text: 'sidebar.client',
        path: 'client',
        icon: <EventNoteSharpIcon />,
        permissions: [PERMISSIONS['Admin.Clients']],
      },
      {
        key: 'Task',
        text: 'sidebar.task',
        path: 'task',
        icon: <ImportContactsRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Tasks']],
      },
      {
        key: 'Leave types',
        text: 'sidebar.leaveType',
        path: 'leave-types',
        icon: <DateRangeRoundedIcon />,
        permissions: [PERMISSIONS['MyAbsenceDay']],
      },
      {
        key: 'Branch',
        text: 'sidebar.branch',
        path: 'branch',
        icon: <ApartmentRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Position',
        text: 'sidebar.position',
        path: 'position',
        icon: <DescriptionRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Capabilities',
        text: 'sidebar.capabilities',
        path: 'capabilities',
        icon: <ViewListRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'capability Setting',
        text: 'sidebar.capabilitySetting',
        path: 'capability-setting',
        icon: <SettingsAccessibilityRoundedIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Off day setting',
        text: 'sidebar.offDaySetting',
        path: 'off-day',
        icon: <DateRangeRoundedIcon />,
        permissions: [PERMISSIONS['DayOff']],
      },
      {
        key: 'Overtime setting',
        text: 'sidebar.overtimeSetting',
        path: 'overtime-setting',
        icon: <AccessTimeRoundedIcon />,
        permissions: [PERMISSIONS['Report.OverTime']],
      },
      {
        key: 'Audit log',
        text: 'sidebar.auditLog',
        path: 'auditlog',
        icon: <SettingsIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
      {
        key: 'Background job',
        text: 'sidebar.backgroundJob',
        path: 'background-job',
        icon: <UpdateIcon />,
        permissions: [PERMISSIONS['Admin.Configuration']],
      },
    ],
  },
  {
    key: 'Project',
    text: 'sidebar.projects',
    path: 'projects',
    icon: <AssessmentSharpIcon />,
    permissions: [PERMISSIONS['Project']],
  },
  {
    key: 'My timesheets',
    text: 'sidebar.myTimesheets',
    path: 'home',
    icon: <AccessAlarmIcon />,
    permissions: [PERMISSIONS['MyTimesheet']],
  },
  {
    key: 'Absence Day',
    text: 'sidebar.myRequest',
    path: 'absence-day',
    icon: <EventBusySharpIcon />,
    permissions: [PERMISSIONS['MyAbsenceDay']],
  },
  {
    key: 'My working time',
    text: 'sidebar.myWorkingTime',
    path: 'my-working-time',
    icon: <InsertInvitationSharpIcon />,
    permissions: [PERMISSIONS['MyWorkingTime']],
  },
  {
    key: 'Manage timesheet',
    text: 'sidebar.manageTimesheet',
    path: 'timesheets',
    icon: <DateRangeRoundedIcon />,
    permissions: [PERMISSIONS['Timesheet']],
  },
  {
    key: 'Manage request absence ',
    text: 'sidebar.manageRequest',
    path: 'off-day-project',
    icon: <RuleSharpIcon />,
    permissions: [PERMISSIONS['Admin.Configuration.WorkingDay']],
  },
  {
    key: 'Manage working time',
    text: 'sidebar.manageWorkingTime',
    path: 'manage-working-times',
    icon: <AccessAlarmSharpIcon />,
    permissions: [PERMISSIONS['Admin.Configuration.WorkingDay']],
  },
  {
    key: 'Team woringking calender',
    text: 'sidebar.teamWoringkingCalender',
    path: 'off-day-project-for-user',
    icon: <GroupsSharpIcon />,
    permissions: [PERMISSIONS['MyWorkingTime']],
  },
  {
    key: 'Timesheets monitoring',
    text: 'sidebar.timesheetsMonitoring',
    path: 'timesheets-supervisior',
    icon: <SupervisedUserCircleSharpIcon />,
    permissions: [PERMISSIONS['Admin.Configuration.WorkingDay']],
  },
  {
    key: 'Retro',
    text: 'sidebar.retro',
    path: 'retro',
    icon: <EventNoteSharpIcon />,
    permissions: [PERMISSIONS['Retro']],
  },
  {
    key: 'Review intern',
    text: 'sidebar.reviewIntern',
    path: 'review',
    icon: <RateReviewSharpIcon />,
    permissions: [PERMISSIONS['Report']],
  },
  {
    key: 'Report',
    text: 'sidebar.report',
    path: 'report',
    icon: <DescriptionSharpIcon />,
    permissions: [PERMISSIONS['Report']],
    children: [
      {
        key: 'Intern info',
        text: 'sidebar.internInfo',
        path: 'interns-info',
        icon: <DescriptionSharpIcon />,
        permissions: [PERMISSIONS['Report.InternsInfo']],
      },
      {
        key: 'Normal working',
        text: 'sidebar.normalWorking',
        path: 'normal-working',
        icon: <WorkOutlineOutlinedIcon />,
        permissions: [PERMISSIONS['Report.NormalWorking']],
      },
      {
        key: 'Over time',
        text: 'sidebar.overTime',
        path: 'over-time',
        icon: <DateRangeOutlinedIcon />,
        permissions: [PERMISSIONS['Report.NormalWorking']],
      },
      {
        key: 'Tardiness',
        text: 'sidebar.tardiness',
        path: 'tardiness-leave-early',
        icon: <WysiwygOutlinedIcon />,
        permissions: [PERMISSIONS['Report.NormalWorking']],
      },
      {
        key: 'Komu tracker',
        text: 'sidebar.komuTracker',
        path: 'komu-tracker',
        icon: <AddchartOutlinedIcon />,
        permissions: [PERMISSIONS['Report']],
      },
    ],
  },
];
