export default function doSomethingExpensive(count: number = 10) {
  return Array(count * 1000).fill(1).map((val, i) => val + i);
}