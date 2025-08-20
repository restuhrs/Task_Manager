import { useState, useEffect } from "react";
import Modal from "./Modal";
import { CalendarClock, Clock } from "lucide-react";
import { STATUS_OPTIONS } from "../constants/statusOptions";

function EditTaskModal({ isOpen, onClose, initialTask, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [note, setNote] = useState("");

  // Set initial values saat modal dibuka
  useEffect(() => {
    if (initialTask) {
      const start = new Date(initialTask.startDateTime);
      const end = initialTask.endDateTime
        ? new Date(initialTask.endDateTime)
        : null;

      setTitle(initialTask.title || "");
      setDate(start.toISOString().slice(0, 10));
      setStartTime(start.toTimeString().slice(0, 5));
      setEndTime(end ? end.toTimeString().slice(0, 5) : "");
      setStatus(initialTask.status || "Not Started");
      setNote(initialTask.note || "");
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !startTime) return;

    const startDateTime = `${date}T${startTime}`;
    const endDateTime = endTime ? `${date}T${endTime}` : null;

    onSave({ ...initialTask, title, startDateTime, endDateTime, status, note });
    onClose();
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
        form="edit-task-form"
        type="submit"
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task" footer={Footer}>
      <form id="edit-task-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>

        {/* Date */}
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
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Time */}
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
              className="flex-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="mx-2 text-gray-500">to</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="flex-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} /> {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add additional details here..."
          />
        </div>
      </form>
    </Modal>
  );
}

export default EditTaskModal;
