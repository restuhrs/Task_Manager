import { useState, useEffect, useRef } from "react";
import PomodoroControls from "./PomodoroControls";
import { formatTime, getProgress } from "../../constants/timerUtils";
import soundFile from "./sound_alert.mp3";

export default function PomodoroTimer() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("focus");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const audioRef = useRef(new Audio(soundFile));

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      audioRef.current.play();
      if (sessionType === "focus") {
        setSessionType("break");
        setTimeLeft(breakTime);
        setSessionsCompleted((prev) => prev + 1);
      } else {
        setSessionType("focus");
        setTimeLeft(focusTime);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, sessionType, breakTime, focusTime]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSessionType("focus");
    setTimeLeft(focusTime);
    setSessionsCompleted(0);
  };

  const totalTime = sessionType === "focus" ? focusTime : breakTime;
  const progress = getProgress(totalTime, timeLeft);

  return (
    <div className="p-4 bg-gray-50 rounded-2xl text-center max-w-md mx-auto flex flex-col items-center gap-4">
      {/* Sesi selesai */}
      <p className="text-sm text-gray-600 font-medium">
        Sesi selesai: {sessionsCompleted}
      </p>

      {/* Timer */}
      <p className="text-5xl font-mono font-bold">{formatTime(timeLeft)}</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-5 mt-2 overflow-hidden">
        <div
          className="h-5 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to right, #3b82f6, #14b8a6)",
          }}
        ></div>
      </div>

      {/* Kontrol */}
      <PomodoroControls
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        isRunning={isRunning}
        sessionType={sessionType}
      />

      {/* Custom Timer */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={focusTime / 60}
            onChange={(e) => {
              const val = e.target.value * 60;
              setFocusTime(val);
              if (sessionType === "focus") setTimeLeft(val);
            }}
            className="w-16 p-1 border rounded text-center"
          />
          <span>Focus (min)</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={breakTime / 60}
            onChange={(e) => {
              const val = e.target.value * 60;
              setBreakTime(val);
              if (sessionType === "break") setTimeLeft(val);
            }}
            className="w-16 p-1 border rounded text-center"
          />
          <span>Break (min)</span>
        </div>
      </div>
    </div>
  );
}
