import { memo, Profiler, useEffect, useMemo, useState } from "react";
import doSomethingExpensive from "src/utils/doSomethingExpensive";
import { debounce } from 'lodash';

export default function FilterList() {
  const [shouldRender, setShouldRender] = useState(false);
  const [items, setItems] = useState(createItems(500));
  const [filter, setFilter] = useState('');

  const filteredItems = (() => {
    const start = Date.now();
    const filtered = items.filter(item => item.id.includes(filter));
    doSomethingExpensive(1000);
    console.log('filtering items', { duration: Date.now() - start });
    return filtered;
  })();
  const handleFilterChange = (value) => setFilter(value);
  const handleFilterChangeDebounced = useMemo(() => {
    return debounce((value) => setFilter(value), 400);
  }, [setFilter]);
  const handleItemChange = (id, value) => {
    setItems((s) => s.map(item => item.id === id ? { ...item, value } : item));
  }

  useEffect(() => setShouldRender(true), []);

  if (!shouldRender) return null;

  return (
    <div className="">
      <h2 className="font-bold text-xl">FilterList</h2>

      <div className="mb-10">
        <label className="mr-2">Filter:</label>
        <TextInput
          value={filter}
          onChangeText={handleFilterChange}
          // onChangeText={handleFilterChangeDebounced}
        />
      </div>

      <Profiler id="filterList" onRender={renderCallback}>
        <ul className="">
          {filteredItems.map(item => (
            <FilterListItem key={item.id} item={item} onChange={handleItemChange}/>
          ))}
          {filteredItems.length === 0 && <span className="text-gray-400">no matching items</span>}
        </ul>
      </Profiler>
    </div>
  );
}

function FilterListItem({ item, onChange }: { item: Item, onChange: (id: string, value: string) => void }) {
  doSomethingExpensive(100);
  return (
    <li className="font-mono flex items-center my-1">
      <span className="mr-1 text-xs">{item.id}</span>
      <TextInput value={item.value} onChangeText={(value) => onChange(item.id, value)}/>
    </li>
  )
}

const FilterListItemMemo = memo(FilterListItem, (prev, next) =>
  prev.item.id === next.item.id && prev.item.value === next.item.value
);

function TextInput({ value: controlledValue, onChangeText }) {
  const [value, setValue] = useState(controlledValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    onChangeText(e.target.value);
  };

  useEffect(() => {
    if (value !== controlledValue) setValue(controlledValue);
  }, [controlledValue]);

  return (
    <input type="text"
      className="border-2 rounded p-1"
      value={value}
      onChange={handleChange}
    />
  )
}

function createItems(count: number) {
  return Array(count).fill(1).map(createItem);
}

type Item = ReturnType<typeof createItem>;

function createItem() {
  return {
    id: typeof window !== 'undefined'
      ? crypto.randomUUID()
      : `${Date.now() + Math.random()}`,
    value: '',
  };
}

function renderCallback(id, phase, actualDuration, baseDuration) {
  console.log('render', { id, phase, actualDuration, baseDuration });
}