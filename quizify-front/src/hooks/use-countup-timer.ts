import { useCallback, useEffect, useRef, useState } from "react";

interface CountupTimer {
  seconds: number;
  minutes: number | undefined;
  hours: number | undefined;
  paused: boolean;
  startTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
}

const useCountupTimer = (): CountupTimer => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number | undefined>(undefined);
  const [hours, setHours] = useState<number | undefined>(undefined);

  const [paused, setPaused] = useState(true);

  const startTimer = useCallback(() => {
    setPaused(false);
  }, []);

  const resetTimer = useCallback(() => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setPaused(true);
  }, []);

  const stopTimer = useCallback(() => {
    setPaused(true);
  }, []);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      if (seconds === 59) {
        setSeconds(0);
        setMinutes((prev) => (prev ?? 0) + 1);
      } else {
        setSeconds((prev) => (prev ?? 0) + 1);
      }

      if (minutes === 59) {
        setMinutes(0);
        setHours((prev) => (prev ?? 0) + 1);
      }
    }, 1000);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [minutes, seconds, hours, paused]);

  return { seconds, minutes, hours, paused, startTimer, resetTimer, stopTimer };
};

export default useCountupTimer;
