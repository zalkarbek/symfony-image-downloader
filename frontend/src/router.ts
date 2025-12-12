import { createBrowserRouter } from 'react-router';

import About from '@/pages/About.tsx';
import Home from '@/pages/Home.tsx';
import Root from '@/pages/Root.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
    ],
  },
]);
