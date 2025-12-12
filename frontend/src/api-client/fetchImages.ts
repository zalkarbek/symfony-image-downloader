import { baseUrl, defaultFetchInitHeaders, handleError } from '@/api-client/http-config.ts';
import { get } from '@/api-client/http.ts';

export async function fetchImages () {

  const url = `${baseUrl}/api/images`;
  const response: Response = await get(url, {
    headers: {
      ...defaultFetchInitHeaders.headers,
    },
  });

  if (!response.ok) {
    await handleError(response);
  }

  return await response.json();
}
