import { ProjectType } from '@/libs/features/project/types.ts';

export const BADGE_PROJECT_TYPE: Record<number, string> = {
  0: 'T&M',
  1: 'FF',
  2: 'NB',
  3: 'ODC',
};
export const PROJECT_TYPES = [
  { label: 'T&M', value: ProjectType.TM },
  { label: 'Fixed Price', value: ProjectType.FF },
  { label: 'Non-Bill', value: ProjectType.NonBill },
  { label: 'ODC', value: ProjectType.ODC },
  { label: 'Product', value: ProjectType.Product },
  { label: 'Training', value: ProjectType.Training },
  { label: 'NoSalary', value: ProjectType.NoSalary },
];
