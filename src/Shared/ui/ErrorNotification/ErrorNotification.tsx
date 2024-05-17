import React, { useEffect, useState } from 'react';
import styles from './ErrorNotification.module.scss';
import { ErrorNotificationProps } from './ErrorNotification.props';
import classNames from 'classnames'; // не забудьте установить эту библиотеку

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  className
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false); 
    }
  }, [message]);
  

  if (!visible) return null;
  return (
    <div className={classNames(styles['ErrorNotification'], className)}>
      {message}
    </div>
  );
};

export default ErrorNotification;
