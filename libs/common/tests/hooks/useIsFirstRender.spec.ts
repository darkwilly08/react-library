import { cleanup, renderHook } from '@testing-library/react-hooks';

import { useIsFirstRender } from '../../src';

describe('useIsFirstRender', () => {
  afterEach(() => {
    cleanup();
  });

  test('should be true on first render only', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());
    expect(result.current).toBe(true);
    rerender();
    expect(result.current).toBe(false);
    rerender();
    expect(result.current).toBe(false);
  });
});
