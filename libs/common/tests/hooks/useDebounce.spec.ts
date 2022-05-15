import { cleanup, renderHook, act } from '@testing-library/react-hooks';

import { useDebounce } from '../../src';

describe('useDebounce', () => {
  const mockValues = {
    delay: 1000,
    value: 'testing :)',
  };
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should delay the event n millis', async () => {
    const { result } = renderHook(() => useDebounce(mockValues.value, mockValues.delay));

    expect(result.current).toBe(null);

    act(() => {
      jest.advanceTimersByTime(mockValues.delay);
    });

    expect(result.current).toBe(mockValues.value);
  });

  test('should delay the event until value no changes anymore', async () => {
    mockValues.value = ''; // Initial value.
    const { result, rerender } = renderHook(() => useDebounce(mockValues.value, mockValues.delay));

    expect(result.current).toBe(null);
    expect(jest.getTimerCount()).toBe(1);
    act(() => {
      jest.advanceTimersByTime(mockValues.delay / 2);
    });
    expect(result.current).toBe(null);

    mockValues.value = 't';
    rerender();
    expect(result.current).toBe(null);
    expect(jest.getTimerCount()).toBe(1);

    act(() => {
      jest.advanceTimersByTime(mockValues.delay / 2);
    });
    mockValues.value = 'te';
    rerender();
    expect(result.current).toBe(null);

    act(() => {
      jest.advanceTimersByTime(mockValues.delay / 2);
    });
    mockValues.value = 'tes';
    rerender();
    expect(result.current).toBe(null);

    act(() => {
      jest.advanceTimersByTime(mockValues.delay / 2);
    });
    mockValues.value = 'test';
    rerender();

    expect(result.current).toBe(null);
    act(() => {
      jest.advanceTimersByTime(mockValues.delay);
    });
    expect(result.current).toBe('test');
  });
});
