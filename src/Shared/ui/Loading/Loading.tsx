import react from 'react';
import styles from './Loading.module.scss';

import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className={styles['loader-container']}>
      <div className={styles['spinner']}></div>
    </div>
  );
};

export default Loading;

/*
import react from 'react';

import React from 'react';
import { LoadingProps } from './Loading.props';

const Loading:React.FC<LoadingProps>= ({message}) => {
  return <div>{message}</div>;
};

export default Loading;

 */
