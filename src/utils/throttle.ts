export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limitMs: number
): T & { cancel: () => void } {
  let inThrottle = false;
  let lastResult: void;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;

      timeoutId = setTimeout(() => {
        inThrottle = false;
      }, limitMs);
    }
    return lastResult;
  } as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    inThrottle = false;
  };

  return throttled;
}
