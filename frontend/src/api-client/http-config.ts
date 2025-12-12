
export const defaultFetchInitHeaders: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const baseUrl = 'http://localhost:8000';

export async function handleError(response: Response) {
  const errorData = await response.json().catch(() => null);
  const errorMessage = errorData?.message || `Ошибка запроса: ${response.status}`;
  throw new Error(errorMessage);
}
