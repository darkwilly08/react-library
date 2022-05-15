import { useState, useEffect } from 'react';
import { useIsSsr } from './useIsSsr';

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

const getDefault = () => {
  return {
    sm: true,
    md: true,
    lg: false,
    xl: false,
    xxl: false,
  };
};

const useScreenSize = () => {
  const isSsr = useIsSsr();
  const [size, setSize] = useState(isSsr ? getDefault() : getSize());
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
