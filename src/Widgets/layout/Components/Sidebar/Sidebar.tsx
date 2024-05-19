import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Sidebar.module.scss';
import { Avatar, CustomLink } from '@/Shared/ui/index';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { AppDispatch, RootState } from '@/App/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/Entities/Auth/AuthSlice';
import { setIsOpen } from './model';
import { SidebarProps } from './Sidebar.proops';
import IconExit from '@/Shared/assets/images/exit.png';

const Sidebar: React.FC<SidebarProps> = ({ nameHeader }) => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.side.isSidebarOpen // Получаем состояние боковой панели из Redux store
  );
  const dispatch: AppDispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [usernameVisible, setUsernameVisible] = useState<boolean>(false);

  // Обработчик выхода из профиля
  const handleLogOut = useCallback(() => {
    dispatch(logout()); //  Вызываем action для выхода из профиля
    navigate('/auth/login'); // переход на главную страницу
  }, [dispatch, navigate]);

  // Обработчик изменения размера окна
  const handleResize = useCallback(() => {
    const shouldShowUsername = window.innerWidth <= 768;
    dispatch(setIsOpen(shouldShowUsername)); // если окно меньше 768px то скрываем панель
    setUsernameVisible(shouldShowUsername); // если окно меньше 768px то показываем имя пользователя
  }, [dispatch]);

  useEffect(() => {
    handleResize(); // Вызов обработчика при монтировании компонента
    window.addEventListener('resize', handleResize); // Обработчик на событие изменения размера страницы

    return () => {
      window.removeEventListener('resize', handleResize); // Очистка события
    };
  }, [handleResize]);

  useEffect(() => {
    if (
      (location.pathname === '/teams' || location.pathname === '/players') &&
      window.innerWidth <= 768
    ) {
      dispatch(setIsOpen(true)); // Скрываем сайдбар после выбора teams или players
    }
  }, [location, dispatch]);

  return (
    <div
      ref={sidebarRef}
      className={cn({
        [styles['aside-wrapper-open']]: !isSidebarOpen,
        [styles['aside-wrapper']]: isSidebarOpen
      })}
    >
      {usernameVisible && (
        <div className={styles['aside-user']}>
          <div className={styles['aside-user_info']}>
          <Avatar />
          <span>{nameHeader}</span>
          </div>

        </div>
      )}
      {/* Добавление active для текущего маршрута */}
      <div
        className={cn(styles['aside-teams'], {
          [styles['active']]: location.pathname == '/teams'
        })}
      >
        <CustomLink classname={styles['aside-players-link']} href="/teams">
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
        <CustomLink classname={styles['aside-players-link']} href="/players">
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
        <div className={styles['aside-sign_out-content']}>
          <img src={IconExit} alt="Выход" />
          <span>Sign&nbsp;out</span>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
