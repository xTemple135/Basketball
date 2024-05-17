import React from 'react';
import {
  Main,
  NotFound,
  PlayerPage,
  PlayersEditPage,
  PlayersPage,
  TeamEditPage,
  TeamPage,
  TeamsPage
} from '@/Pages';
import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from '@/Pages/Auth';
import { SignIn, SignUp } from '@/Widgets';
import { PrivateRoute } from './PrivateRoute';
import { getToken } from '@/Features';
import axios from 'axios';
import { PREFIX } from '@/Shared/ui';
import { TeamsInterface } from '@/Entities/Teams/model';
import PlayersEdit from '@/Pages/main/pages/Player-Page/PlayerPage';
import { PlayerInterface } from '@/Entities';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      { path: '/players', element: <PlayersPage /> },
      {
        path: '/players/:id',
        element: <PlayerPage />,
        loader: async ({ params }) => {
          try {
            const token = getToken();
            const { data } = await axios.get<PlayerInterface>(
              `${PREFIX}/api/Player/Get`,
              {
                params: {
                  id: params.id
                },
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            return data;
          } catch (error) {
            throw new Error('Ошибка загрузки игрока');
          }
        }
      },
      { path: '/player-edit', element: <PlayersEditPage /> },
      { path: '/player-edit/:id', element: <PlayersEditPage /> },

      { path: '/teams', element: <TeamsPage /> },
      {
        path: '/teams/:id',
        element: <TeamPage />,
        loader: async ({ params }) => {
          try {
            const token = getToken();
            const { data } = await axios.get<TeamsInterface>(
              `${PREFIX}/api/Team/Get`,
              {
                params: {
                  id: params.id
                },
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            return data;
          } catch (error) {
            throw new Error('Ошибка загрузки команды');
          }
        }
      },
      {
        path: '/team-edit',
        element: <TeamEditPage />
      },
      {
        path: '/team-edit/:id',
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
