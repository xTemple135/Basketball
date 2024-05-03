import React from 'react';
import { Main, NotFound, PlayersPage, TeamEditPage, TeamsPage } from '@/Pages';
import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from '@/Pages/Auth';
import { SignIn, SignUp } from '@/Widgets';
import { PrivateRoute } from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        {' '}
        <Main />
      </PrivateRoute>
    ),
    children: [
      { path: '/players', element: <PlayersPage /> },
      { path: '/teams', element: <TeamsPage /> },
      {
        path: '/team-edit',
        element: <TeamEditPage />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />,
    children: [
      {
        path: 'register',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <SignIn />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
