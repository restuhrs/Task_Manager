import { ClipboardList, CirclePlus } from "lucide-react";

function TaskListHeader({ onAdd }) {
  return (
    <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-2xl shadow-md">
      {/* Kiri */}
      <div className="flex items-center gap-3">
        <ClipboardList size={22} className="text-gray-800" />
        <p className="text-gray-800 font-semibold text-lg">All Tasks</p>
        {/* <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span> */}
      </div>

      {/* Kanan */}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:scale-105 transform transition shadow-md"
      >
        <CirclePlus size={18} /> Add Task
      </button>
    </div>
  );
}

export default TaskListHeader;
