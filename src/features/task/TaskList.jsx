import TaskItem from "../../components/TaskItem";
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
      {tasks.length === 0 ? (
        <div className="text-center py-10 text-gray-400 flex flex-col items-center gap-2">
          <ClipboardList size={48} className="animate-bounce text-gray-400" />
          <p className="text-lg">No tasks yet!</p>
        </div>
      ) : (
        <>
          {/* Info drag */}
          <div className="flex items-center gap-2 text-xs text-gray-500 italic mb-2">
            <div className="relative group">
              {/* Icon dengan tooltip */}
              <GripVertical
                size={16}
                className="cursor-pointer text-gray-500 focus:outline-none"
                tabIndex={0} // biar bisa di-focus pakai keyboard
                aria-describedby="dragTooltip"
              />

              {/* Tooltip */}
              <div
                id="dragTooltip"
                role="tooltip"
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block group-focus-within:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-10"
              >
                Hold icon
              </div>
            </div>

            <div className="relative flex items-center">
              <span>Drag & drop task</span>
            </div>
          </div>

          {/* Drag & Drop List */}
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
