const BASE_URL =
  process.env.NEXT_PUBLIC_URL_JSONPLACERHOLDER ||
  "https://jsonplaceholder.typicode.com";

function getErrorMessage(res: Response, fallback: string): string {
  const statusMessages: Record<number, string> = {
    404: "Recurso no encontrado",
    500: "Error en el servidor. Intenta más tarde.",
    502: "Servicio no disponible. Intenta más tarde.",
    503: "Servicio no disponible. Intenta más tarde."
  };
  return statusMessages[res.status] ?? fallback;
}

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      },
      ...options
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        (errorData as { message?: string })?.message ||
        getErrorMessage(res, `Error ${res.status}: ${res.statusText}`);
      throw new Error(message);
    }

    return res.json();
  } catch (err) {
    if (err instanceof Error) {
      if (
        err instanceof TypeError &&
        (err.message.includes("fetch") || err.message.includes("Failed"))
      ) {
        throw new Error("Sin conexión. Revisa tu red e intenta de nuevo.");
      }
      throw err;
    }
    throw new Error("Ha ocurrido un error inesperado.");
  }
}
