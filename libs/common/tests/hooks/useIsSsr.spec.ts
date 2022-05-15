import { renderHook } from '@testing-library/react-hooks/server';

import { useIsSsr } from '../../src';

describe('useIsSsr', () => {
  it('should be ssr true up to render on the client', async () => {
    const { result, hydrate } = renderHook(() => useIsSsr());
    expect(result.current).toBeTruthy();
    hydrate();
    expect(result.current).toBeFalsy();
  });
});
