import React from 'react';
import '@/App/styles/App.scss';
import { RouterProvider } from 'react-router-dom';
import router from './routers/appRouter';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      {' '}
      <RouterProvider router={router}></RouterProvider>{' '}
    </Provider>
  );
}

export default App;
