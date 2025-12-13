import { useState, useEffect } from "react";

/**
 * Custom React hook to debounce a value.
 *
 * @template T The type of the value to debounce.
 * @param {T} value The value to debounce.
 * @param {number} delay The delay in milliseconds before the debounced value updates.
 * @returns {T} The debounced value.
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  // State to store the debounced value.
  // We explicitly set the type of debouncedValue to T.
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes or the component unmounts.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run if value or delay changes

  return debouncedValue;
}

export default useDebounce;
