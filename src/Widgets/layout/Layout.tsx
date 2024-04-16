import React from 'react';
import styles from './Layout.module.scss';
import { Header, Sidebar } from './Components';
import { Input } from '@/Shared/ui';

const Layout: React.FC = () => {
  return (
    <div className={styles['layout']}>
      <Header>Джон</Header>
      <Sidebar />
      <Input isSearch placeholder="Search..." />
    </div>
  );
};

export default Layout;
