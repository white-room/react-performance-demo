import Counter from "src/components/Counter";
import useGlobalStore from "src/hooks/useGlobalStore";

export default function CountersPage() {
  const store = useGlobalStore();
  
  return (
    <div className="flex">
      <div className="p-2">
        <Counter
          title="Counter #1"
          value={store.counter}
          onIncrement={store.increment}
          onDecrement={store.decrement}
        />
      </div>
      
      <div className="p-2">
        <Counter
          title="Counter #2"
          value={store.counter2}
          onIncrement={store.increment2}
          onDecrement={store.decrement2}
        />
      </div>
    </div>
  );
}