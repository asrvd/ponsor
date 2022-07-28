import { FiHeart } from "react-icons/fi";

export default function TriggerButton() {
  return (
    <button className="px-4 py-2 w-48 h-12 text-center bg-white border hover:bg-gray-50 transition rounded-xl shadow-lg flex items-center">
      <FiHeart />
      Support Me
    </button>
  );
}
