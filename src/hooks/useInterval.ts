import { useEffect } from "react";
import useLatest from "./useLatest";

/**
 * input function to be exectuted every 1 second
 * @param fn interval function
 * @param deps timer effect dependencies
 * @param options.immediate whether the function should be executed immediately on first execution
 */
export const useInterval = (
  fn: () => void,
  deps: Array<any> = [],
  options?: {
    immediate?: boolean;
  }
) => {
  const immediate = options?.immediate;

  const fnRef = useLatest(fn);

  useEffect(() => {
    if (immediate) {
      fnRef.current();
    }
    const timer = setInterval(() => {
      fnRef.current();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [...deps]);
};
