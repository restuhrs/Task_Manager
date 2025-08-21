import { Play, Pause, RefreshCw } from "lucide-react";

export default function PomodoroControls({
  onStart,
  onPause,
  onReset,
  isRunning,
  sessionType,
}) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Label sesi */}
      <span className="font-semibold text-gray-700 text-lg">
        {sessionType === "focus" ? "Focus" : "Break"}
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
