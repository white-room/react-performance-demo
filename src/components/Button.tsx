export default function Button({ children, onClick }) {
  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}