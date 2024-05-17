import React from 'react';
import styles from './EmptyItems.module.scss';
import { IEmptyItemsProps } from './EmptyItems.props';
import cn from 'classnames';

const EmptyItems: React.FC<IEmptyItemsProps> = ({
  image,
  title,
  text,
}) => {
  return (
    <div className={cn(styles['EmptyItems'])}>
      <div className={styles['EmptyItems_img']}>
        <img src={image} alt="ImageEmpty" />
      </div>
      <div className={styles['EmptyItems_title']}>{title || 'Empty here'}</div>
      <div className={styles['EmptyItems_text']}>{text}</div>
    </div>
  );
};

export default EmptyItems;
