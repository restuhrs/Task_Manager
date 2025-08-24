import TaskItem from "../../components/TaskItem";
import TaskListHeader from "../../components/TaskListHeader";
import { ClipboardList, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function TaskList({ tasks, onUpdate, onDelete, setTasks }) {
  // Fungsi untuk reorder task array
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = reorder(tasks, result.source.index, result.destination.index);
    setTasks(items);
  };

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
        <>
          {/* fragment lebih dari 2 element */}
          <div className="flex items-center gap-2 text-xs text-gray-500 italic mb-2">
            <GripVertical size={16} className="text-gray-500" />
            <div className="relative group flex items-center">
              <span className="cursor-pointer">Hold icon to drag & drop</span>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                Hold icon on a task to drag & drop
              </div>
            </div>
          </div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id.toString()}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`transition transform ${
                            snapshot.isDragging ? "scale-105" : ""
                          }`}
                        >
                          <TaskItem
                            task={task}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </div>
  );
}

export default TaskList;
