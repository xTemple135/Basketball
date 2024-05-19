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
import { fetchTeamById } from '@/Entities/Teams/model';
import { fetchPlayerById } from '@/Entities';

const router = createBrowserRouter([
  {
    path: '/', // Главная страница
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      { path: '/players', element: <PlayersPage /> }, // Страница списка игроков
      {
        path: '/players/:id',
        element: <PlayerPage />,
        loader: fetchPlayerById // Загрузка данных об игроке
      },
      { path: '/player-edit', element: <PlayersEditPage /> }, // Страница добавления игрока или его редактирование
      { path: '/player-edit/:id', element: <PlayersEditPage /> },

      { path: '/teams', element: <TeamsPage /> }, // Страница списка команд
      {
        path: '/teams/:id',
        element: <TeamPage />, // Страница отдельной команды
        loader: fetchTeamById // Загрзка данных о команде
      },
      {
        path: '/team-edit',
        element: <TeamEditPage /> // Страница добавления или редактирования команды
      },
      {
        path: '/team-edit/:id',
        element: <TeamEditPage /> 
      }
    ]
  },
  {
    path: '/auth', // Страница авторизации
    element: <AuthPage />,
    children: [
      {
        path: 'register', // Регистрация
        element: <SignUp />
      },
      {
        path: 'login', // Авторизация
        element: <SignIn />
      }
    ]
  },
  {
    path: '*', // Неправильный путь
    element: <NotFound />
  }
]);

export default router;
