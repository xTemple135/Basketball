import React, { useEffect } from 'react';
import styles from './Layout.module.scss';
import { Header, Sidebar, setIsOpen } from './Components';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/App/store';
import { useUserFromLocalStorage } from '@/Shared';

const Layout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const nameHeader = useSelector((state: RootState) => state.auth.name);
  const isSidebarOpen = useSelector(
    (state: RootState) => state.side.isSidebarOpen
  );
  // Отображение имя пользователя
  useUserFromLocalStorage();

  return (
    <div className={styles['layout']}>
      <Header>{nameHeader}</Header>
      <Sidebar nameHeader={nameHeader} />
      {!isSidebarOpen && (
        <div
          className={styles['sidebar_background']}
          onClick={() => dispatch(setIsOpen(true))}
        />
      )}
      <div className={styles['layout_content']}>
        <div className={styles['search-add']}></div>
        {/* Дочерние компоненты react router dom */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
