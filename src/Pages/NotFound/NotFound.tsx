import React from 'react';
import styles from './NotFound.module.scss';
import NotFoundImg from '@/Shared/assets/images/NotFound.png';

const NotFound: React.FC = () => {
  return (
    <section className={styles['notFound-page']}>
        <img src={NotFoundImg} alt="404" />
        <div className={styles['notFound-title']}>Page not found</div>
        <div className={styles['notFound-text']}>
          Sorry, we can’t find what you’re looking for
        </div>
    </section>
  );
};

export default NotFound;
