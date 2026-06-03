export interface IMember {
  id: number;
  name: string;
  emailAddress: string;
  isActive: boolean;
  type: number;
  jobTitle: string | null;
  level: number | null;
  userCode: string | null;
  avatarPath: string;
  avatarFullPath: string;
  branch: number;
  branchDisplayName: string;
  branchId: number;
  branchColor: string;
  positionId: number;
  positionName: string;
}
export enum MemberType {
  Staff = 0,
  Internship = 1,
  Collaborator = 2,
}
export enum MemberRole {
  Member = 0,
  PM = 1,
  Shadow = 2,
  Deactive = 3,
}

export type MemberLookupMap = Map<number, IMember>;
