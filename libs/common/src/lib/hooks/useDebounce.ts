import { useState, useEffect } from 'react';

const useDebounce = (val: string | null, delay: number, initialValue?: string) => {
  const [debouncedVal, setDebouncedVal] = useState<string | null>(initialValue !== undefined ? initialValue : null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedVal(val);
    }, delay);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [val, delay]);
  return debouncedVal;
};

export { useDebounce };
