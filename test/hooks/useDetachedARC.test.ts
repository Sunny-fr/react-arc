import { renderHook, waitFor } from '@testing-library/react';
import { useDetachedARC } from '../../src/hooks/useDetachedARC';
import { describe, it, expect, vi } from 'vitest';

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve('{}'),
    ok: true,
  } as Response)
));

describe('useDetachedARC', () => {
  it('should return the initial state and fetch data', async () => {
    const ARCConfig = {
      name: 'test',
      modelProps: ['id'],
      paths: {
        item: '/{id}'
      },
    };
    const { result } = renderHook(() => useDetachedARC({ ARCConfig, props: {id: 1} }));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.loaded).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.response).toEqual({});
    });
  });
});