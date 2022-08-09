import Counter1 from "src/components/Counter1";
import Counter2 from "src/components/Counter2";
import FilterList from "src/components/FilterList";

export default function WrappedCounterPage() {
  return (
    <div className="flex">
      <div className="p-2">
        <Counter1 />
      </div>
      
      <div className="p-2">
        <Counter2 />
      </div>
    </div>
  );
}