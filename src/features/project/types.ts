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
