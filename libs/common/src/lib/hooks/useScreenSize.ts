import { useState, useEffect } from 'react';

const getSize = () => {
  const { innerWidth } = window;
  return {
    sm: innerWidth >= 576,
    md: innerWidth >= 768,
    lg: innerWidth >= 992,
    xl: innerWidth >= 1200,
    xxl: innerWidth >= 1400,
  };
};

const useScreenSize = () => {
  const [size, setSize] = useState(getSize());
  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export { useScreenSize };
