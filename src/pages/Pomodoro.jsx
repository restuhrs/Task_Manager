import PomodoroTimer from "../features/pomodoro/PomodoroTimer";

export default function PomodoroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-50 rounded-xl pb-24 flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mt-8 mb-6 text-center">
        Pomodoro Timer
      </h1>

      {/* Card untuk timer */}
      <div className="w-full max-w-lg p-6 sm:p-8 bg-white rounded-3xl shadow-2xl flex flex-col items-center">
        <PomodoroTimer />
      </div>

      {/* Deskripsi */}
      <p className="mt-6 text-gray-600 text-sm text-center px-4">
        Focus on your tasks with the Pomodoro technique. Adjust focus and break
        times as needed.
      </p>
    </div>
  );
}
