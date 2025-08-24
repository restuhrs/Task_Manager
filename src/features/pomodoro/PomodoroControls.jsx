import { Play, Pause, RefreshCw } from "lucide-react";

export default function PomodoroControls({
  onStart,
  onPause,
  onReset,
  isRunning,
  sessionType,
}) {
  const sessionLabels = {
    focus: { text: "Focus Mode", bg: "bg-red-100", textColor: "text-red-700" },
    break: {
      text: "Break Session",
      bg: "bg-green-100",
      textColor: "text-green-700",
    },
    longBreak: {
      text: "Long Break",
      bg: "bg-blue-100",
      textColor: "text-blue-700",
    },
  };

  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Badge sesi */}
      <span
        className={`px-3 py-1 rounded-full font-semibold text-sm shadow-sm 
          ${sessionLabels[sessionType].bg} ${sessionLabels[sessionType].textColor}`}
      >
        {sessionLabels[sessionType].text}
      </span>

      {/* Tombol kontrol */}
      <div className="flex gap-4">
        {isRunning ? (
          <button
            onClick={onPause}
            className="p-3 bg-red-500 text-white rounded-lg shadow-md hover:scale-110 transform transition"
            title="Pause"
          >
            <Pause size={20} />
          </button>
        ) : (
          <button
            onClick={onStart}
            className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:scale-110 transform transition"
            title="Start"
          >
            <Play size={20} />
          </button>
        )}

        <button
          onClick={onReset}
          className="p-3 bg-gray-500 text-white rounded-lg shadow-md hover:scale-110 transform transition"
          title="Reset"
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  );
}
