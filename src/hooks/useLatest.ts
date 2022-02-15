import { useRef } from "react";

/**
 * returns the latest value, avoiding the closure problem
 */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
