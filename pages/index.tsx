import Counter from "src/components/Counter";
import Counter1 from "src/components/Counter1";
import Counter2 from "src/components/Counter2";
import FilterList from "src/components/FilterList";
import useGlobalStore from "src/hooks/useGlobalStore";

export default function HomePage() {
  // const store = useGlobalStore();
  
  return (
    <>
      <h1 className="text-3xl font-bold">
        MyApp
      </h1>
      
      <div className="flex">
        <div className="p-2">
          {/* <Counter
            title="Counter #1"
            value={store.counter}
            onIncrement={store.increment}
            onDecrement={store.decrement}
          /> */}
          <Counter1 />
        </div>
        
        <div className="p-2">
          {/* <Counter
            title="Counter #2"
            value={store.counter2}
            onIncrement={store.increment2}
            onDecrement={store.decrement2}
          /> */}
          <Counter2 />
        </div>

      </div>

      {/* <div className="pt-20">
        <FilterList />
      </div> */}
    </>
  );
}