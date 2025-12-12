
import { useState } from 'react';
import type { FormEvent } from 'react';

import {uploadImages} from '@/api-client/uploadImages.ts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UploadFormProps {
  onImagesLoaded: (images: string[]) => void;
}

export function ImageUploadForm({ onImagesLoaded }: UploadFormProps) {
  const [url, setUrl] = useState('');
  const [minWidth, setMinWidth] = useState(200);
  const [minHeight, setMinHeight] = useState(200);
  const [overlayText, setOverlayText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data: { images: string[] } = await uploadImages({ url, minWidth, minHeight, overlayText });

      onImagesLoaded(data.images);

    } catch (err) {

      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-6">
      <Input
        placeholder="URL страницы"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="flex space-x-2">
        <Label htmlFor="image-width">width</Label>
        <Input
          id="image-width"
          type="number"
          placeholder="width"
          value={minWidth}
          onChange={(e) => setMinWidth(Number(e.target.value))}
        />
        <Label htmlFor="image-height">height</Label>
        <Input
          id="image-height"
          type="number"
          placeholder="height"
          value={minHeight}
          onChange={(e) => setMinHeight(Number(e.target.value))}
        />
      </div>
      <Input
        placeholder="Текст на изображении"
        value={overlayText}
        onChange={(e) => setOverlayText(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Загрузить'}
      </Button>
    </form>
  );
}
