import React from 'react';
import { Main, NotFound } from '@/Pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
    ],
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
