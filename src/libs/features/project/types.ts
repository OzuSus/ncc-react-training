export enum ProjectStatus {
  Active = 0,
  Deactive = 1,
}

export interface IProject {
  customerName: string;
  name: string;
  code: string;
  status: number;
  pms: string[];
  activeMember: number;
  projectType: number;
  timeStart: string | null;
  timeEnd: string | null;
  id: number;
}

export interface IProjectQuantity {
  status: number;
  quantity: number;
}

export enum ProjectType {
  TM = 0,
  FF = 1,
  NonBill = 2,
  ODC = 3,
  Product = 4,
  Training = 5,
  NoSalary = 6,
}

export interface IProjectDetail {
  id: number;
  name: string;
  code: string;
  status: number;
  timeStart: string | null;
  timeEnd: string | null;
  note: string | null;
  projectType: number;
  customerId: number;
  isAllUserBelongTo: boolean;
  komuChannelId: string | null;
  isNoticeKMSubmitTS: boolean;
  isNoticeKMRequestOffDate: boolean;
  isNoticeKMApproveRequestOffDate: boolean;
  isNoticeKMRequestChangeWorkingTime: boolean;
  isNoticeKMApproveChangeWorkingTime: boolean;
  tasks: { taskId: number; billable: boolean; id: number }[];
  users: { userId: number; type: number; isTemp: boolean; id: number }[];
}
export enum FilterDateRangeMode {
  Week = 'week',
  Month = 'month',
  Quarter = 'quarter',
  Year = 'year',
  AllTime = 'allTime',
  CustomTime = 'customTime',
}

export interface IViewProjecttask {
  taskId: number;
  taskName: string;
  totalWorkingTime: number;
  billableWorkingTime: number;
  billable: boolean;
}
export interface IViewProjectTeam {
  userID: number;
  userName: string;
  projectUserType: number;
  totalWorkingTime: number;
  billableWorkingTime: number;
}
export interface IExportTimesheet {
  userName: string;
  dateAt: string;
  typeOfWork: number;
  taskName: string;
  note: string;
  workingTime: number;
  targetUserWorkingTime: number;
  targetUserName: string;
  roleName: string;
  isShadow: boolean;
  id: number;
}
