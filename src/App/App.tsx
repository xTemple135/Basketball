import React from 'react';
import '@/App/styles/App.scss';
import { RouterProvider } from 'react-router-dom';
import router from './routers/appRouter';

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
