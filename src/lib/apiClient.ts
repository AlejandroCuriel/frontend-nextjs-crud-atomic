export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_JSONPLACERHOLDER}${url}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!res.ok) {
  const errorData = await res.json().catch(() => ({}));
  throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
}

  return res.json();
}
