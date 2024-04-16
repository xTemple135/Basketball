import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Link.module.scss';
import { ILink } from './Link.props';
import cn from 'classnames';

const CustomLink: React.FC<ILink> = ({
  href,
  isDisabled = false,
  children
}) => {
  return (
    <Link
      to={href}
      className={cn(styles['ui-link'], {
        [styles['disabled']]: isDisabled
      })}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
