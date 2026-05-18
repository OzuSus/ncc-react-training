import { createAppStore } from '@/app-core/store-setup.ts';

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

interface IProjectState {
  projects: IProject[];
  setProjects: (projects: IProject[]) => void;
}

const initialState: IProjectState = {
  projects: [],
};

export const useProjectStore = createAppStore<IProjectState>(
  (set) => ({
    ...initialState,
    setProjects: (projects) =>
      set((state) => {
        state.projects = projects;
      }),
  }),
  'project',
);
