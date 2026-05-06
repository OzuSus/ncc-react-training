import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type StoreCreator<T> = (
  set: (fn: (state: T) => void) => void,
  get: () => T,
) => T;

export const createAppStore = <T>(
  storeCreator: StoreCreator<T>,
  persistKey?: string,
) => {
  return persistKey
    ? create<T>()(
        persist(
          immer((set, get) =>
            storeCreator(
              set as unknown as (fn: (state: T) => void) => void,
              get,
            ),
          ),
          { name: persistKey } as PersistOptions<T>,
        ),
      )
    : create<T>()(
        immer((set, get) =>
          storeCreator(set as unknown as (fn: (state: T) => void) => void, get),
        ),
      );
};
