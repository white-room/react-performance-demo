import Counter from "src/components/Counter";
import useGlobalStore from "src/hooks/useGlobalStore";

export default function Counter1() {
  const store = useGlobalStore();

  return <Counter
    title="Counter #1"
    value={store.counter}
    onDecrement={store.decrement}
    onIncrement={store.increment}
  />;
}