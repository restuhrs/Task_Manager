import { useState, useEffect } from "react";
import React, { lazy, Suspense } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TaskList from "./features/task/TaskList";
import TaskListHeader from "./components/TaskListHeader";
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
    setTasks([{ ...task, id: Date.now(), note: task.note || "" }, ...tasks]);
    toast.success("Task added successfully!");
  };

  // UPDATE
  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...updatedTask, note: updatedTask.note || "" } : task
      )
    );
    toast.info("Task updated successfully!");
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("Task deleted!");
  };

  const ToastContainer = lazy(() =>
    import("react-toastify").then((m) => ({ default: m.ToastContainer }))
  );

  return (
    <Router>
      <main className="min-h-screen bg-gray-100 p-6 pb-20">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                {/* Header utama */}
                <header className="bg-blue-100 shadow-lg rounded-2xl p-6 mb-6">
                  <h1 className="text-3xl font-bold text-blue-600">
                    Task Manager
                  </h1>
                  <p className="text-gray-500 mt-1">
                    Manage your tasks efficiently
                  </p>
                </header>

                {/* Dashboard */}
                <Dashboard tasks={tasks} />

                {/* Task Header */}
                <TaskListHeader
                  tasks={tasks}
                  onAdd={() => setShowModal(true)}
                />

                {/* Task List */}
                <TaskList
                  tasks={tasks}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                  setTasks={setTasks}
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
        <Suspense fallback={null}>
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
            limit={3}
          />
        </Suspense>

        {/* Footer Nav */}
        <FooterNav />

        {/* Footer copyright */}
        <footer className="mt-6 py-4 text-center text-gray-500 text-sm border-t border-gray-300 relative">
          © {new Date().getFullYear()} by Restu. All rights reserved.
        </footer>
      </main>
    </Router>
  );
}

export default App;
