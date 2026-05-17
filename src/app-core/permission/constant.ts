export const PERMISSIONS = {
  Admin: 'Admin',
  'Admin.Users': 'Admin.Users',
  'Admin.Users.View': 'Admin.Users.View',
  'Admin.Users.AddNew': 'Admin.Users.AddNew',
  'Admin.Users.Edit': 'Admin.Users.Edit',

  'Admin.Roles': 'Admin.Roles',
  'Admin.Roles.View': 'Admin.Roles.View',

  'Admin.Configuration': 'Admin.Configuration',
  'Admin.Configuration.Email': 'Admin.Configuration.Email',
  'Admin.Configuration.Email.ViewEmail': 'Admin.Configuration.Email.ViewEmail',
  'Admin.Configuration.WorkingDay': 'Admin.Configuration.WorkingDay',
  'Admin.Configuration.WorkingDay.ViewWorkingDay':
    'Admin.Configuration.WorkingDay.ViewWorkingDay',
  'Admin.Configuration.GoogleSignOn': 'Admin.Configuration.GoogleSignOn',
  'Admin.Configuration.GoogleSignOn.ViewGoogleSignOn':
    'Admin.Configuration.GoogleSignOn.ViewGoogleSignOn',
  'Admin.Configuration.AutoLockTimesheet':
    'Admin.Configuration.AutoLockTimesheet',
  'Admin.Configuration.AutoLockTimesheet.ViewAutoLockTimesheet':
    'Admin.Configuration.AutoLockTimesheet.ViewAutoLockTimesheet',
  'Admin.Configuration.SercurityCode': 'Admin.Configuration.SercurityCode',
  'Admin.Configuration.SercurityCode.ViewSercurityCode':
    'Admin.Configuration.SercurityCode.ViewSercurityCode',
  'Admin.Configuration.EmailSaoDo': 'Admin.Configuration.EmailSaoDo',
  'Admin.Configuration.EmailSaoDo.ViewEmailSaoDo':
    'Admin.Configuration.EmailSaoDo.ViewEmailSaoDo',
  'Admin.Configuration.LogTimesheetInFuture':
    'Admin.Configuration.LogTimesheetInFuture',
  'Admin.Configuration.LogTimesheetInFuture.ViewLogTimesheetInFuture':
    'Admin.Configuration.LogTimesheetInFuture.ViewLogTimesheetInFuture',
  'Admin.Configuration.AutoSubmitTimesheet':
    'Admin.Configuration.AutoSubmitTimesheet',
  'Admin.Configuration.AutoSubmitTimesheet.ViewAutoSubmitTimesheet':
    'Admin.Configuration.AutoSubmitTimesheet.ViewAutoSubmitTimesheet',
  'Admin.Configuration.Email.EditEmail': 'Admin.Configuration.Email.EditEmail',
  'Admin.Configuration.WorkingDay.EditWorkingDay':
    'Admin.Configuration.WorkingDay.EditWorkingDay',
  'Admin.Configuration.GoogleSignOn.EditGoogleSignOn':
    'Admin.Configuration.GoogleSignOn.EditGoogleSignOn',

  'Admin.Clients': 'Admin.Clients',
  'Admin.Clients.View': 'Admin.Clients.View',
  'Admin.Clients.AddNew': 'Admin.Clients.AddNew',
  'Admin.Clients.Edit': 'Admin.Clients.Edit',
  'Admin.Clients.Delete': 'Admin.Clients.Delete',

  'Admin.Tasks': 'Admin.Tasks',
  'Admin.Tasks.View': 'Admin.Tasks.View',
  'Admin.Tasks.AddNew': 'Admin.Tasks.AddNew',
  'Admin.Tasks.Edit': 'Admin.Tasks.Edit',
  'Admin.Tasks.Delete': 'Admin.Tasks.Delete',
  'Admin.Tasks.ChangeStatus': 'Admin.Tasks.ChangeStatus',

  Project: 'Project',
  'Project.View': 'Project.View',
  'Project.ViewAll': 'Project.ViewAll',
  'Project.AddNew': 'Project.AddNew',
  'Project.Edit': 'Project.Edit',
  'Project.Delete': 'Project.Delete',
  'Project.ViewDetail': 'Project.ViewDetail',
  'Project.ChangeStatus': 'Project.ChangeStatus',
  'Project.UpdateDefaultProjectTask': 'Project.UpdateDefaultProjectTask',

  MyTimesheet: 'MyTimesheet',
  'MyTimesheet.View': 'MyTimesheet.View',
  'MyTimesheet.AddNew': 'MyTimesheet.AddNew',
  'MyTimesheet.Edit': 'MyTimesheet.Edit',
  'MyTimesheet.Delete': 'MyTimesheet.Delete',
  'MyTimesheet.Submit': 'MyTimesheet.Submit',

  MyProfile: 'MyProfile',
  'MyProfile.View': 'MyProfile.View',
  'MyProfile.RequestUpdateInfo': 'MyProfile.RequestUpdateInfo',

  Timesheet: 'Timesheet',
  'Timesheet.View': 'Timesheet.View',
  'Timesheet.ViewStatus': 'Timesheet.ViewStatus',
  'Timesheet.Approval': 'Timesheet.Approval',
  'Timesheet.Export': 'Timesheet.Export',

  MyAbsenceDay: 'MyAbsenceDay',
  'MyAbsenceDay.View': 'MyAbsenceDay.View',
  'MyAbsenceDay.AddNew': 'MyAbsenceDay.AddNew',
  'MyAbsenceDay.SendRequest': 'MyAbsenceDay.SendRequest',
  'MyAbsenceDay.CancelRequest': 'MyAbsenceDay.CancelRequest',

  DayOff: 'DayOff',
  'DayOff.View': 'DayOff.View',
  'DayOff.AddNew': 'DayOff.AddNew',
  'DayOff.Edit': 'DayOff.Edit',
  'DayOff.Delete': 'DayOff.Delete',

  MyWorkingTime: 'MyWorkingTime',
  'MyWorkingTime.View': 'MyWorkingTime.View',
  'MyWorkingTime.RegistrationTime': 'MyWorkingTime.RegistrationTime',
  'MyWorkingTime.Edit': 'MyWorkingTime.Edit',
  'MyWorkingTime.Delete': 'MyWorkingTime.Delete',

  Report: 'Report',
  'Report.InternsInfo': 'Report.InternsInfo',
  'Report.InternsInfo.View': 'Report.InternsInfo.View',
  'Report.NormalWorking': 'Report.NormalWorking',
  'Report.NormalWorking.View': 'Report.NormalWorking.View',
  'Report.NormalWorking.Export': 'Report.NormalWorking.Export',
  'Report.OverTime': 'Report.OverTime',
  'Report.OverTime.View': 'Report.OverTime.View',

  Retro: 'Retro',
  'Retro.View': 'Retro.View',
  'Retro.AddNew': 'Retro.AddNew',
  'Retro.Edit': 'Retro.Edit',
  'Retro.Delete': 'Retro.Delete',
  'Retro.ChangeStatus': 'Retro.ChangeStatus',
} as const;
