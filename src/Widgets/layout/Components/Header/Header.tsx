import React from 'react';
import styles from './Header.module.scss';

import Logo from '@/Shared/assets/images/logo.png';
import { Avatar } from '@/Shared/ui/Avatar';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  children: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className={styles['header']}>
      <div className={styles['header_logo']}>
       <Link to={'/'}><img src={Logo} alt="Логотип нашего сайта" /></Link> 
      </div>
      <nav className={styles['header_right']}>
        <div className={styles['header_user']}>{children} </div>
        <Avatar />
      </nav>
    </header>
  );
};

export default Header;
