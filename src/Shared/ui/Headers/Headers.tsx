import React from 'react';
import styles from './Headers.module.scss';
import { HeadersProps } from './Headers.props';

const Headers: React.FC<HeadersProps> = ({ text }) => {
  return <div className={styles['header']}>{text}</div>;
};

export default Headers;
