import { FiHeart } from "react-icons/fi";

export default function TriggerButton() {
  return (
    <button className="px-4 py-4 w-[10.5rem] h-[2.64rem] text-center bg-gray-100 border hover:bg-gray-800 transition rounded-xl shadow-lg flex items-center justify-start gap-4">
      <FiHeart />
      Support Me
    </button>
  );
}
