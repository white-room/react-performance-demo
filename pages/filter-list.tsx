import { memo, Profiler, useEffect, useMemo, useState } from "react";
import doSomethingExpensive from "src/utils/doSomethingExpensive";
import { debounce } from 'lodash';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Item = { id: string, value: string };

export default function FilterListPage() {
  // state
  const [shouldRender, setShouldRender] = useState(false);
  const { data: remoteItems } = useQuery(['items'], fetchItems);
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState(remoteItems ?? []);

  // computed state
  const filteredItems = filterSortItems(items, filter);

  // handlers
  const handleFilterChange = (value) => setFilter(value);
  const handleItemChange = (id, value) => {
    setItems((s) => s.map(item => item.id === id ? { ...item, value } : item));
  }

  // effects
  useEffect(() => setShouldRender(true), []);
  useEffect(() => {
    if (remoteItems) setItems(remoteItems);
  }, [remoteItems]);

  if (!shouldRender) return null;

  return (
    <div>
      <div className="mb-10">
        <label className="mr-2">Filter:</label>
        <TextInput
          value={filter}
          onChangeText={handleFilterChange}
        />
      </div>

      <Profiler id="filterList" onRender={renderCallback}>
        <ul className="">
          {filteredItems.map(item => (
            <FilterListItem
              key={item.id}
              item={item}
              onChange={handleItemChange}
            />
          ))}
          {filteredItems.length === 0 && <span className="text-gray-400">no matching items</span>}
        </ul>
      </Profiler>
    </div>
  );
}












// components
function FilterListItem({ item, onChange }: { item: Item, onChange: (id: string, value: string) => void }) {
  doSomethingExpensive(500);
  return (
    <li className="font-mono flex items-center my-1">
      <span className="mr-1 text-xs w-4">{item.id}</span>
      <TextInput value={item.value} onChangeText={(value) => onChange(item.id, value)}/>
    </li>
  )
}

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


// misc
async function fetchItems() {
  console.log('fetching items...');
  const { data } = await axios.get<Item[]>('https://62f2b4dab1098f150817dadd.mockapi.io/items');
  return data;
}

function filterSortItems(items: Item[], filter: string) {
  const start = Date.now();
  const filtered = items.filter(item => item.value.toLowerCase().includes(filter));
  doSomethingExpensive(10000);
  console.log('filtering items', { duration: Date.now() - start });
  return filtered;
}

function renderCallback(id, phase, actualDuration, baseDuration) {
  console.log('render', { id, phase, actualDuration, baseDuration });
}

// const handleFilterChangeDebounced = useMemo(() =>
//   debounce((value) => setFilter(value), 400),
//   [setFilter]
// );

// const handleItemChangeDebounced = useMemo(() =>
//   debounce((id, value) => handleItemChange(id, value), 200),
//   [handleItemChange]
// );

// const FilterListItemMemo = memo(FilterListItem, (prev, next) =>
//   prev.item.id === next.item.id && prev.item.value === next.item.value
// );