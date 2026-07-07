import type { ApiResponse } from '@/types/api';

const BASE_URL = '/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  const body: ApiResponse<T> = await response.json();

  if (!response.ok) throw new Error(body.message);
  return body.data;
}

export { request };
