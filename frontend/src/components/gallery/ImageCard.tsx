import {Maximize2, Download} from 'lucide-react';
import { useState } from 'react';

import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ImageCardProps {
  src: string;
  overlayText?: string;
}

export function ImageCard({ src, overlayText }: ImageCardProps) {
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'image.jpg';
    link.click();
  };

  return (
    <Card className="relative w-52 h-52 overflow-hidden group py-0!">

      {/* Buttons (appear on hover) */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">

        {/* Fullscreen button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-black/60 text-white p-1 rounded hover:bg-black/80">
              <Maximize2 size={18} />
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl p-0 bg-black">
            <img src={src} alt="" className="w-full h-auto" />
          </DialogContent>

        </Dialog>

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="bg-black/60 text-white p-1 rounded hover:bg-black/80"
        >
          <Download size={18} />
        </button>
      </div>

      {/* Image */}
      <img src={src} alt={overlayText} className="object-cover w-full h-full" />

      {/* Overlay text */}
      {overlayText && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 text-center text-sm">
          {overlayText}
        </div>
      )}
    </Card>
  );
}
