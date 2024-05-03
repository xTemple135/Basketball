import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Link.module.scss';
import { ILink } from './Link.props';
import cn from 'classnames';

const CustomLink: React.FC<ILink> = ({
  href,
  isDisabled,
  children,
  underLine
}) => {
  return (
    <Link
      to={href} // принимает в себя имя маршрута страницы
      className={cn(styles['ui-link'], {
        [styles['disabled']]: isDisabled,
        [styles['underline']]: underLine
      })}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
