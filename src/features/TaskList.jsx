import TaskItem from "../components/TaskItem";
import TaskListHeader from "../components/TaskListHeader";
import { ClipboardList } from "lucide-react";

function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <div className="space-y-4">
      {/* Header dengan jumlah task */}
      <TaskListHeader tasks={tasks} />

      {/* Daftar task */}
      {tasks.length === 0 ? (
        <div className="text-center py-10 text-gray-400 flex flex-col items-center gap-2">
          <ClipboardList size={48} className="animate-bounce text-gray-400" />
          <p className="text-lg">No tasks yet!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
