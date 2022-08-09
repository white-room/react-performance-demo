import Counter from "src/components/Counter";
import useGlobalStore from "src/hooks/useGlobalStore";
import shallow from 'zustand/shallow';  

export default function Counter2() {
  const store = useGlobalStore();
  // const store = useGlobalStore(s => ({
  //   counter2: s.counter2,
  //   increment2: s.increment2,
  //   decrement2: s.decrement2,
  // }), shallow);
  // console.log('Counter2', store);

  return <Counter
    title="Counter #2"
    value={store.counter2}
    onDecrement={store.decrement2}
    onIncrement={store.increment2}
  />;
}