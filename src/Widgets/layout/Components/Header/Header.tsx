import React from 'react';
import styles from './Header.module.scss';

import Logo from '@/Shared/assets/images/logo.png';
import { Avatar } from '@/Shared/ui/Avatar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/App/store';

import BurgerIcon from '@/Shared/assets/icons/Burger.svg';
import { toggleSideBar } from '../Sidebar';

export interface HeaderProps {
  children: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleHamburgerClick = () => {
    dispatch(toggleSideBar());
  };
  return (
    <header className={styles['header']}>
      <button
        onClick={handleHamburgerClick}
        className={styles['header_burger']}
      >
        <img src={BurgerIcon} alt="Burger icon" />
      </button>
      <div className={styles['header_logo']}>
        <Link to={'/players'}>
          <img src={Logo} alt="Логотип нашего сайта" />
        </Link>
      </div>
      <nav className={styles['header_right']}>
        <div className={styles['header_user']}>{children}</div>
        <div className={styles['header_avatar']}>
          <Avatar />
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
