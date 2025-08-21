import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TaskList from "./features/task/TaskList";
import AddTaskModal from "./features/task/AddTaskModal";
import Pomodoro from "./pages/Pomodoro";
import FooterNav from "./components/FooterNav";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // CREATE
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), note: task.note || "" }]);
    toast.success("Task berhasil ditambahkan!");
  };

  // UPDATE
  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...updatedTask, note: updatedTask.note || "" } : task
      )
    );
    toast.info("Task berhasil diupdate!");
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("Task berhasil dihapus!");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6 pb-20">
        {/* Routes */}
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                {/* Header */}
                <header className="bg-blue-100 shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-blue-600">
                      Task Manager
                    </h1>
                    <p className="text-blue-500 mt-1">
                      Manage your tasks efficiently
                    </p>
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:scale-105 transform transition shadow-md"
                  >
                    <CirclePlus size={20} /> Add Task
                  </button>
                </header>

                {/* Dashboard */}
                <Dashboard tasks={tasks} />

                {/* Task List */}
                <TaskList
                  tasks={tasks}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              </>
            }
          />

          {/* Pomodoro Route */}
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Routes>

        {/* Modal Add Task */}
        <AddTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAdd={addTask}
        />

        {/* Toast */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />

        {/* Footer Nav */}
        <FooterNav />

        {/* Footer copyright */}
        <footer className="mt-6 py-4 text-center text-gray-500 text-sm border-t border-gray-300 relative">
          © {new Date().getFullYear()} by Restu. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
