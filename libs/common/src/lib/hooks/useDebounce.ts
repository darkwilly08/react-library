import { useState, useEffect } from 'react';

const useDebounce = (val: string | null, delay: number) => {
  const [debouncedVal, setDebouncedVal] = useState<string | null>(null);

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
