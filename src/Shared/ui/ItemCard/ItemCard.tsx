import React from 'react';
import styles from './ItemCard.module.scss';
import { ItemCardProps } from './index';
import { PREFIX } from '../API';


const ItemCard: React.FC<ItemCardProps> = ({ type, image, title, subtitle, number }) => {
  return (
<div className={styles['itemCard']}>
  <div className={styles['itemCard-inner']}>
    <div className={styles['itemCard-image-container']} style={{ justifyContent: type === 'team' ? 'center' : 'flex-end' }}>
      <img src={`${PREFIX}${image}`} alt={title} className={styles['itemCard-image']} style={{ alignSelf: type === 'player' ? 'flex-end' : 'center' }} />
    </div>
    <div className={styles['itemCard-info']}>
      <div className={styles['itemCard-info_title']}>
        {title}
        {type === 'player' && number && <span className={styles['itemCard-info_number']}>&nbsp;#{number}</span>}
      </div>
      <div className={styles['itemCard-info_subtitle']}>{subtitle}</div>
    </div>
  </div>
</div>
  );
};

export default ItemCard;
