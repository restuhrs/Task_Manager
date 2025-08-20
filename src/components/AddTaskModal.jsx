import { useState } from "react";
import Modal from "./Modal";
import { CalendarClock, Clock } from "lucide-react";
import { STATUS_OPTIONS } from "../constants/statusOptions";

function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !startTime) return;

    const startDateTime = `${date}T${startTime}`;
    const endDateTime = endTime ? `${date}T${endTime}` : null;

    onAdd({ title, startDateTime, endDateTime, status, note });
    onClose();

    setTitle("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setStatus("Not Started");
    setNote("");
  };

  const Footer = (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        form="add-task-form"
        type="submit"
        className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Add Task
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Task" footer={Footer}>
      <form id="add-task-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="ex. Daily Meeting"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center px-3 py-2 rounded-xl border bg-gray-50">
              <CalendarClock size={18} className="text-gray-500" />
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center px-3 py-2 rounded-xl border bg-gray-50">
              <Clock size={18} className="text-gray-500" />
            </div>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="flex-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="mx-2 text-gray-500">to</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="flex-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            {STATUS_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = status === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                    active
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} /> {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add additional details here..."
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddTaskModal;
