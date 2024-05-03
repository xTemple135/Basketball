import React from 'react';
import styles from './ErrorNotification.module.scss';
import { ErrorNotificationProps } from './ErrorNotification.props';

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
}) => {
  return <div className={styles['ErrorNotification']}>
    {message}
  </div>;
};

export default ErrorNotification;
