import React, { useEffect } from 'react';
import styles from './Layout.module.scss';
import { Header, Sidebar } from './Components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/App/store';
import { loginLocalStorage } from '@/Entities/Auth/AuthSlice';

const Layout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const nameHeader = useSelector((state: RootState) => state.auth.name);

  // Отображение имя пользователя
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo && userInfo.name) {
      dispatch(loginLocalStorage(userInfo));
    }
  }, [dispatch]);
  return (
    <div className={styles['layout']}>
      <Header>{nameHeader}</Header>
      <Sidebar />
      <div className={styles['layout_content']}>
        <div className={styles['search-add']}></div>
        {/* Дочерние компоненты react router dom */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
