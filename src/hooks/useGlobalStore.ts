import create from 'zustand';

type GlobalStoreState = {
  counter: number;
  increment: () => void;
  decrement: () => void;

  counter2: number;
  increment2: () => void;
  decrement2: () => void;
};

type SetState<T> = (setter: (state: T) => Partial<T> | Partial<T>) => void;

const createInitialState = (set: SetState<GlobalStoreState>): GlobalStoreState => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
  
  counter2: 99,
  increment2: () => set((state) => ({ counter2: state.counter2 + 1 })),
  decrement2: () => set((state) => ({ counter2: state.counter2 - 1 })),
})

const useGlobalStore = create<GlobalStoreState>(createInitialState);

export default useGlobalStore;