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
