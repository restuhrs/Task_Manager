import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  // Ambil data awal dari localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);

  // Simpan tasks ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // CREATE
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), note: task.note || "" }]);
  };

  // UPDATE
  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...updatedTask, note: updatedTask.note || "" } : task
      )
    );
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">To Do List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transform transition"
        >
          <CirclePlus size={20} /> Add Task
        </button>
      </header>

      {/* Statistik */}
      <Dashboard tasks={tasks} />

      {/* Daftar Task */}
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />

      {/* Modal */}
      <AddTaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addTask}
      />
    </div>
  );
}

export default App;
