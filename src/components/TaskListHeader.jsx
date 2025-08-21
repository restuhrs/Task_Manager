import { ClipboardList } from "lucide-react";

function TaskListHeader({ tasks }) {
  return (
    <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-2xl shadow-md">
      {/* Teks dan icon */}
      <div className="flex items-center gap-2">
        <ClipboardList size={20} className="text-gray-500" />
        <p className="text-gray-500 font-semibold text-base sm:text-lg">
          Your Tasks
        </p>
      </div>

      {/* Badge jumlah task */}
      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
        {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
      </div>
    </div>
  );
}

export default TaskListHeader;
