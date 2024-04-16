import React from 'react';
import styles from './Header.module.scss';

import Logo from '@/Shared/assets/images/logo.png';
import { Avatar } from '@/Shared/ui/Avatar';

export interface HeaderProps {
  children: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_logo}>
        <img src={Logo} alt="Логотип нашего сайта" />
      </div>
      <nav className={styles.header_right}>
        <div className={styles.header_user}>{children} </div>
        <Avatar />
      </nav>
    </header>
  );
};

export default Header;
