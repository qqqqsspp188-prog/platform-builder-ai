export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Request failed');
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
