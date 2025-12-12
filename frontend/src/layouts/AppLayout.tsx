import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex justify-center flex-col h-screen w-full max-w-4xl mx-auto">

      {/* Header */}
      <header className="bg-neutral-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Скачать картинки из источника(с водяным знаком)
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto bg-neutral-50">
        {children}
      </main>
    </div>
  );
}
