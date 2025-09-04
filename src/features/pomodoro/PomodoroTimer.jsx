import { useState, useEffect, useRef } from "react";
import PomodoroControls from "./PomodoroControls";
import { formatTime, getProgress } from "../../constants/timerUtils";
import soundFile from "./sound_alert.mp3";
import { toast } from "react-toastify";
import NoSleep from "nosleep.js";
import { Monitor } from "lucide-react";

export default function PomodoroTimer() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(15 * 60);

  const now = Date.now();
  const savedState = JSON.parse(localStorage.getItem("pomodoroState")) || {};
  const savedSessions =
    JSON.parse(localStorage.getItem("pomodoroSessions")) || {};

  /* daily completed session */
  const today = new Date().toDateString();
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    if (savedSessions.date === today) return savedSessions.count;
    return 0;
  });

  /* timer state */
  const [sessionType, setSessionType] = useState(
    savedState.sessionType ?? "focus"
  );
  const [isRunning, setIsRunning] = useState(savedState.isRunning ?? false);
  const [timeLeft, setTimeLeft] = useState(() => {
    if (savedState.isRunning && savedState.endTime) {
      const remaining = Math.round((savedState.endTime - now) / 1000);
      return remaining > 0 ? remaining : 0;
    }
    return savedState.timeLeft ?? focusTime;
  });

  const audioRef = useRef(new Audio(soundFile));
  const endTimeRef = useRef(savedState.endTime ?? null);

  useEffect(() => {
    localStorage.setItem(
      "pomodoroState",
      JSON.stringify({
        timeLeft,
        sessionType,
        isRunning,
        endTime: endTimeRef.current,
      })
    );
  }, [timeLeft, sessionType, isRunning]);

  useEffect(() => {
    localStorage.setItem(
      "pomodoroSessions",
      JSON.stringify({ date: today, count: sessionsCompleted })
    );
  }, [sessionsCompleted, today]);

  const [wakeLockActive, setWakeLockActive] = useState(false);
  const wakeLockRef = useRef(null);
  const noSleepRef = useRef(null);

  useEffect(() => {
    const enableWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
          setWakeLockActive(true);

          wakeLockRef.current.addEventListener("release", () => {
            setWakeLockActive(false);
          });
        } else {
          // fallback pakai nosleep.js
          noSleepRef.current = new NoSleep();
          noSleepRef.current.enable();
          setWakeLockActive(true);
        }
      } catch (err) {
        console.error("Wake Lock error:", err);
      }
    };

    enableWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
      if (noSleepRef.current) {
        noSleepRef.current.disable();
        noSleepRef.current = null;
      }
      setWakeLockActive(false);
    };
  }, []);

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
    } else if (timeLeft === 0 && !isRunning) {
      /* end session */
      audioRef.current.play();

      if (sessionType === "focus") {
        const newCount = sessionsCompleted + 1;
        setSessionsCompleted(newCount);

        if (newCount % 4 === 0) {
          setSessionType("longBreak");
          setTimeLeft(longBreakTime);
          toast.success("4 sessions done! Enjoy a long break 🫶");
        } else {
          setSessionType("break");
          setTimeLeft(breakTime);
          toast.success("Focus session finished! Time for a break 🎉");
        }
      } else if (sessionType === "break") {
        setSessionType("focus");
        setTimeLeft(focusTime);
        toast.info("Break finished! Back to focus 💪");
      } else if (sessionType === "longBreak") {
        setSessionType("focus");
        setTimeLeft(focusTime);
        toast.info("Long break finished! Let's get back on track 🚀");
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
    <div className="p-4 bg-gray-50 rounded-2xl text-center w-[90%] sm:w-full max-w-md sm:max-w-lg mx-auto flex flex-col items-center gap-4">
      <p className="text-sm text-gray-600 font-medium">
        Sessions completed: {sessionsCompleted}
      </p>

      <p className="text-5xl font-mono font-bold">{formatTime(timeLeft)}</p>

      <div className="w-full bg-gray-200 rounded-full h-5 mt-2 overflow-hidden">
        <div
          className="h-5 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to right, #3b82f6, #14b8a6)",
          }}
        ></div>
      </div>

      <PomodoroControls
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        isRunning={isRunning}
        sessionType={sessionType}
      />

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

      {wakeLockActive && (
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold shadow">
          <Monitor size={14} /> Screen Awake
        </div>
      )}
    </div>
  );
}
