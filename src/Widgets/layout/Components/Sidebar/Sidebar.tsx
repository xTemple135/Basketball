import React from 'react';
import styles from './Sidebar.module.scss';
import { CustomLink } from '@/Shared/ui/index';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { AppDispatch } from '@/App/store';
import { useDispatch } from 'react-redux';
import { logout } from '@/Entities/Auth/AuthSlice';

const Sidebar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  // Обработчик выхода из профиля
  const handleLogOut = () => {
    dispatch(logout());
    navigate('/auth/login');
  };
  const location = useLocation(); 
  return (
    <div className={styles['aside-wrapper']}>
      {/* Добавление active для текущего маршрута */}
      <div
        className={cn(styles['aside-teams'], {
          [styles['active']]: location.pathname == '/teams'
        })}
      >
        <CustomLink href="/teams">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="group_person">
              <path
                id="group_person_2"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.32675 5.33325C7.32675 6.43992 6.44008 7.33325 5.33341 7.33325C4.22675 7.33325 3.33341 6.43992 3.33341 5.33325C3.33341 4.22659 4.22675 3.33325 5.33341 3.33325C6.44008 3.33325 7.32675 4.22659 7.32675 5.33325ZM12.6601 5.33325C12.6601 6.43992 11.7734 7.33325 10.6667 7.33325C9.56008 7.33325 8.66675 6.43992 8.66675 5.33325C8.66675 4.22659 9.56008 3.33325 10.6667 3.33325C11.7734 3.33325 12.6601 4.22659 12.6601 5.33325ZM5.33341 8.66659C3.78008 8.66659 0.666748 9.44659 0.666748 10.9999V11.9999C0.666748 12.3666 0.966748 12.6666 1.33341 12.6666H9.33341C9.70008 12.6666 10.0001 12.3666 10.0001 11.9999V10.9999C10.0001 9.44659 6.88675 8.66659 5.33341 8.66659ZM10.0201 8.69992C10.2534 8.67992 10.4734 8.66659 10.6667 8.66659C12.2201 8.66659 15.3334 9.44659 15.3334 10.9999V11.9999C15.3334 12.3666 15.0334 12.6666 14.6667 12.6666H11.2134C11.2867 12.4599 11.3334 12.2333 11.3334 11.9999V10.9999C11.3334 10.0199 10.8067 9.27992 10.0467 8.72659C10.0447 8.72457 10.0427 8.72194 10.0405 8.71907C10.0354 8.71246 10.0294 8.70457 10.0201 8.69992Z"
              />
            </g>
          </svg>
          <span>Teams</span>
        </CustomLink>
      </div>
      <div
        className={cn(styles['aside-players'], {
          [styles['active']]: location.pathname == '/players'
        })}
      >
        <CustomLink href="/players">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="person">
              <path
                id="person_2"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6667 5.33341C10.6667 6.80675 9.47342 8.00008 8.00008 8.00008C6.52675 8.00008 5.33341 6.80675 5.33341 5.33341C5.33341 3.86008 6.52675 2.66675 8.00008 2.66675C9.47342 2.66675 10.6667 3.86008 10.6667 5.33341ZM2.66675 12.0001C2.66675 10.2267 6.22008 9.33341 8.00008 9.33341C9.78008 9.33341 13.3334 10.2267 13.3334 12.0001V12.6667C13.3334 13.0334 13.0334 13.3334 12.6667 13.3334H3.33341C2.96675 13.3334 2.66675 13.0334 2.66675 12.6667V12.0001Z"
              />
            </g>
          </svg>

          <span>Players</span>
        </CustomLink>
      </div>
      <div onClick={handleLogOut} className={styles['aside-sign_out']}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="input">
            <path
              id="input_2"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.00008 2.00659H14.0001C14.7334 2.00659 15.3334 2.60659 15.3334 3.33993V12.6599C15.3334 13.3933 14.7334 13.9933 14.0001 13.9933H1.98675C1.26008 13.9933 0.666748 13.3999 0.666748 12.6733V10.6666C0.666748 10.2999 0.966748 9.99993 1.33341 9.99993C1.70008 9.99993 2.00008 10.2999 2.00008 10.6666V12.0133C2.00008 12.3799 2.30008 12.6799 2.66675 12.6799H13.3334C13.7001 12.6799 14.0001 12.3799 14.0001 12.0133V3.99326C14.0001 3.62659 13.7001 3.32659 13.3334 3.32659H2.66675C2.30008 3.32659 2.00008 3.62659 2.00008 3.99326V5.33326C2.00008 5.69993 1.70008 5.99993 1.33341 5.99993C0.966748 5.99993 0.666748 5.69993 0.666748 5.33326V3.33993C0.666748 2.60659 1.26675 2.00659 2.00008 2.00659ZM9.76008 8.23992L7.90008 10.0999C7.69342 10.3066 7.33342 10.1599 7.33342 9.85992V8.66658H1.33341C0.966748 8.66658 0.666748 8.36658 0.666748 7.99992C0.666748 7.63325 0.966748 7.33325 1.33341 7.33325H7.33342V6.13992C7.33342 5.83992 7.69342 5.69325 7.90008 5.90658L9.76008 7.76659C9.89342 7.89992 9.89342 8.10659 9.76008 8.23992Z"
            />
          </g>
        </svg>
        <span>Sign&nbsp;out</span>
      </div>
    </div>
  );
};
export default Sidebar;
