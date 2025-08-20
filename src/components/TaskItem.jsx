import { useState } from "react";
import { Edit, Trash2, Loader, CheckCircle2, PlayCircle } from "lucide-react";
import EditTaskModal from "./EditTaskModal";

const statusStyle = {
  "Not Started": "bg-gray-100 text-gray-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Done: "bg-green-100 text-green-700",
};

const statusIcon = {
  "Not Started": PlayCircle,
  "In Progress": Loader,
  Done: CheckCircle2,
};

function TaskItem({ task, onUpdate, onDelete }) {
  const [openEdit, setOpenEdit] = useState(false);
  const Icon = statusIcon[task.status] ?? PlayCircle;

  const toggleStatus = () => {
    let next;
    let completed = false;

    if (task.status === "Not Started") next = "In Progress";
    else if (task.status === "In Progress") {
      next = "Done";
      completed = true;
    } else next = "Not Started";

    onUpdate(task.id, { ...task, status: next, completed });
  };

  const formatDateTime = (start, end) => {
    if (!start) return "-";
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    const dateStr = `${startDate.getDate()} ${startDate.toLocaleString(
      "en-US",
      { month: "short" }
    )}`;
    const startTimeStr = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTimeStr = endDate
      ? endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : null;

    return endTimeStr
      ? `${dateStr}, ${startTimeStr} – ${endTimeStr}`
      : `${dateStr}, ${startTimeStr}`;
  };

  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-xl transition-shadow duration-300 gap-4">
        <div className="flex-1">
          <p className="font-semibold text-xl text-gray-800 break-words mb-2">
            {task.title}
          </p>
          <p className="text-sm text-gray-500">
            {formatDateTime(task.startDateTime, task.endDateTime)}
          </p>
          {task.note && (
            <p className="text-sm text-gray-700 mt-1 italic break-words">
              {task.note}
            </p>
          )}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
          <button
            onClick={toggleStatus}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              statusStyle[task.status]
            } hover:scale-105 transform transition`}
            title="Toggle status"
          >
            <Icon size={16} /> {task.status}
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Edit"
          >
            <Edit size={18} className="text-blue-600" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Delete"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>

      <EditTaskModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        initialTask={task}
        onSave={(updated) => onUpdate(task.id, updated)}
      />
    </>
  );
}

export default TaskItem;
