import { cleanup, renderHook, act } from '@testing-library/react-hooks/server';

import { useScreenSize } from '../../src';

describe('useScreenSize', () => {
  function resize(width: number, height: number): void {
    const resizeEvent = new Event('resize', { bubbles: true, cancelable: true });

    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(resizeEvent);
  }

  afterEach(() => {
    cleanup();
  });

  test('should be md size true on ssr as default', () => {
    const { result } = renderHook(() => useScreenSize());

    expect(result.current.sm).toBe(true);
    expect(result.current.md).toBe(true);
    expect(result.current.lg).toBe(false);
    expect(result.current.xl).toBe(false);
    expect(result.current.xxl).toBe(false);
  });

  test('should be xl true when screen is gth 1200', () => {
    const { result, hydrate } = renderHook(() => useScreenSize());
    hydrate();
    act(() => {
      resize(1201, 500);
    });
    expect(result.current.sm).toBe(true);
    expect(result.current.md).toBe(true);
    expect(result.current.lg).toBe(true);
    expect(result.current.xl).toBe(true);
    expect(result.current.xxl).toBe(false);
  });
});
