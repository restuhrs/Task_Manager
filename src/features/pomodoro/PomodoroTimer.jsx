import { useState, useEffect, useRef } from "react";
import PomodoroControls from "./PomodoroControls";
import { formatTime, getProgress } from "../../constants/timerUtils";
import soundFile from "./sound_alert.mp3";
import { toast } from "react-toastify";

export default function PomodoroTimer() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(15 * 60);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("focus");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const audioRef = useRef(new Audio(soundFile));
  const endTimeRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
        if (remaining <= 0) {
          setTimeLeft(0);
          setIsRunning(false);
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      audioRef.current.play();

      if (sessionType === "focus") {
        const newCount = sessionsCompleted + 1;
        setSessionsCompleted(newCount);

        if (newCount % 4 === 0) {
          setSessionType("longBreak");
          setTimeLeft(longBreakTime);
          toast.success("4 sessions done! Enjoy a long break 🌴");
        } else {
          setSessionType("break");
          setTimeLeft(breakTime);
        }
      } else if (sessionType === "break") {
        setSessionType("focus");
        setTimeLeft(focusTime);
      } else if (sessionType === "longBreak") {
        setSessionType("focus");
        setTimeLeft(focusTime);
      }
    }
    return () => clearInterval(timer);
  }, [
    isRunning,
    timeLeft,
    sessionType,
    breakTime,
    focusTime,
    longBreakTime,
    sessionsCompleted,
  ]);

  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      if (sessionType === "focus") {
        toast.success("Focus session finished! Time for a break 🎉");
      } else if (sessionType === "break") {
        toast.info("Break session finished! Back to focus 💪");
      } else if (sessionType === "longBreak") {
        toast.info("Long break finished! Let's get back on track 🚀");
      }
    }
  }, [timeLeft, isRunning, sessionType]);

  const handleStart = () => {
    endTimeRef.current = Date.now() + timeLeft * 1000;
    setIsRunning(true);
  };
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSessionType("focus");
    setTimeLeft(focusTime);
    setSessionsCompleted(0);
    endTimeRef.current = null;
  };

  const totalTime =
    sessionType === "focus"
      ? focusTime
      : sessionType === "break"
      ? breakTime
      : longBreakTime;

  const progress = getProgress(totalTime, timeLeft);

  return (
    <div className="p-4 bg-gray-50 rounded-2xl text-center w-[90%] sm:w-full max-w-md sm:max-w-lg max-w-md mx-auto flex flex-col items-center gap-4">
      {/* Sesi selesai */}
      <p className="text-sm text-gray-600 font-medium">
        Sessions completed: {sessionsCompleted}
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
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 max-w-xl mx-auto items-center justify-center gap-3">
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
          <span>Focus</span>
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
          <span>Break</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={longBreakTime / 60}
            onChange={(e) => {
              const val = e.target.value * 60;
              setLongBreakTime(val);
              if (sessionType === "longBreak") setTimeLeft(val);
            }}
            className="w-16 p-1 border rounded text-center"
          />
          <span>Long Break</span>
        </div>
      </div>
    </div>
  );
}
