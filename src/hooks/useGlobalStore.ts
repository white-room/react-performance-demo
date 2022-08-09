import create from 'zustand';

type GlobalStoreState = {
  counter: number;
  increment: () => void;
  decrement: () => void;
};

type SetState<T> = (setter: (state: T) => Partial<T> | Partial<T>) => void;

const createInitialState = (set: SetState<GlobalStoreState>): GlobalStoreState => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
})

const useGlobalStore = create<GlobalStoreState>(createInitialState);

export default useGlobalStore;