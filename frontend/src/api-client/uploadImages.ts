import {baseUrl, defaultFetchInitHeaders, handleError} from '@/api-client/http-config.ts';
import {post} from '@/api-client/http.ts';

export interface UploadImageArgs {
  url: string;
  minWidth: number;
  minHeight: number;
  overlayText: string;
}

export async function uploadImages ({ url, minWidth, minHeight, overlayText }: UploadImageArgs) {
  const response: Response = await post(`${baseUrl}/api/images`, {
    body: JSON.stringify({ url, minWidth, minHeight, overlayText }),
    headers: {
      ...defaultFetchInitHeaders.headers,
    },
  });

  if (!response.ok) {
    await handleError(response);
  }

  return await response.json();
}
