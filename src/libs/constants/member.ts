import { MemberType } from '@/libs/features/member/types.ts';

export const MEMBER_ROLE_OPTIONS = [
  { label: 'Member', value: 0 },
  { label: 'PM', value: 1 },
  { label: 'Shadow', value: 2 },
  { label: 'Deactive', value: 3 },
];
export const TEMP_OPTIONS = [
  { label: 'Official', value: false },
  { label: 'Temp', value: true },
];

export const MEMBER_TYPE_OPTIONS = [
  { label: 'All', value: -1 },
  { label: 'Staff', value: MemberType.Staff },
  { label: 'Internship', value: MemberType.Internship },
  { label: 'Collaborator', value: MemberType.Collaborator },
];

export const MEMBER_TYPE_LABEL: Record<number, string> = {
  [MemberType.Staff]: 'Staff',
  [MemberType.Internship]: 'Internship',
  [MemberType.Collaborator]: 'Collaborator',
};

export const MEMBER_TYPE_COLOR: Record<number, string> = {
  [MemberType.Staff]: '#4caf50',
  [MemberType.Internship]: '#ff9800',
  [MemberType.Collaborator]: '#2196f3',
};
