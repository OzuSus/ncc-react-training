import { createAppStore } from '../../app-core/store-setup.ts';

interface CountStore {
  count: number;
  plus: () => void;
  minus: () => void;
}

export const useCountStore = createAppStore<CountStore>(
  (set) => ({
    count: 0,
    plus: () =>
      set((state) => {
        state.count += 1;
      }),
    minus: () =>
      set((state) => {
        state.count -= 1;
      }),
  }),
  'persist-key', // could be leave empty
);
