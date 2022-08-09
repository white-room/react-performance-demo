import { memo } from "react";
import Button from "src/components/Button";
import doSomethingExpensive from "src/utils/doSomethingExpensive";

export default function Counter({
  title,
  value,
  onIncrement,
  onDecrement
}: {
  title: string,
  value: number,
  onIncrement: () => void,
  onDecrement: () => void,
  }) {
  
  doSomethingExpensive(1000);
  
  return (
    <div className="border-4 rounded-lg p-3 flex flex-col items-center">
      <h2 className="font-bold text-lg mb-2">{title}</h2>

      <div className="flex items-center">
        <Button onClick={onDecrement}>-</Button>
        <span className="w-10 text-center">{value}</span>
        <Button onClick={onIncrement}>+</Button>
      </div>
    </div>
  );
}