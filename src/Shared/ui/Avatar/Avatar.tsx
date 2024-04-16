import React from 'react';
import profileIcon from '@/Shared/assets/icons/profile_rounded.svg';
import { IAvatarProps } from './Avatar.props';
import cn from 'classnames';
import styles from './Avatar.module.scss';

const Avatar: React.FC<IAvatarProps> = ({ image, size }) => {
  const sizeInPx =
    size === 'Small' ? '20px' : size === 'Medium' ? '30px' : '40px'; // Вычисляем размер иконки

  return (
      <img
        className={cn(styles['avatar-image'], {
          [styles['avatar-large']]: size === 'Large',
          [styles['avatar-small']]: size === 'Small'
        })}  // добавляем классы в зависимости от размера
        alt="avatar"
        src={image || profileIcon}
        style={{ width: sizeInPx, height: sizeInPx }}
      />
  );
};

export default Avatar;
