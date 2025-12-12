import { useState, useEffect, useCallback } from 'react';

import { fetchImages } from '@/api-client/fetchImages.ts';
import { ImageUploadForm } from '@/components/forms/ImageUploadForm.tsx';
import { ImageCard } from '@/components/gallery/ImageCard.tsx';
import { AppLayout } from '@/layouts/AppLayout.tsx';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onImageLoaded = useCallback((images: string[]) => {
    setImages(images);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchImages();
        if (isMounted) {
          setImages(data.images);
        }

      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('Ошибка при загрузке изображений');
        }

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppLayout>
      <ImageUploadForm onImagesLoaded={onImageLoaded} />

      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-4 gap-4 mt-4">
        {images.map((src, i) => (
          <ImageCard key={i} src={src} overlayText="overlayText" />
        ))}
      </div>
    </AppLayout>
  );
}
