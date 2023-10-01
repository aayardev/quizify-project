"use client";
import { useCallback, useEffect } from "react";

const useKeyPress = (targetKey: string, callback: () => void) => {
  // If pressed key is our target key then run the callback
  const downHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        e.preventDefault();
        callback();
      }
    },
    [callback, targetKey]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);
};

export default useKeyPress;
