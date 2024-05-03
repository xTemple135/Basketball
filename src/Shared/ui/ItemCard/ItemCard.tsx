import React from 'react';
import styles from './ItemCard.module.scss';
import { ItemCardProps } from './index';
import { PREFIX } from '../API';

const ItemCard: React.FC<ItemCardProps> = ({ image, title, subtitle }) => {
  return (
    <div className={styles['itemCard']}>
      <div className={styles['itemCard-inner']}>
        <div className={styles['itemCard-image']}>
          <img src={`${PREFIX}${image}`} alt={title} />
        </div>
        <div className={styles['itemCard-info']}>
          <div className={styles['itemCard-info_title']}>{title}</div>
          <div className={styles['itemCard-info_subtitle']}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
