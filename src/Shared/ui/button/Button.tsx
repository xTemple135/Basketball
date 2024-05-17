import React from 'react';
import styles from './Button.module.scss';
import { IButtonProps } from './Button.props';
import cn from 'classnames';

const Button: React.FC<IButtonProps> = ({
  /**
   * Он принимает несколько пропсов, которые определяют внешний вид кнопки и поведение
   */
  secondary,
  width,
  disabled,
  onClick,
  children,
  className
}) => {
  return (
    <>
      <button
        className={cn(
          styles['button-ui'],
          {
            [styles['red']]: !secondary,
            [styles['white']]: secondary,
            [styles['disabled']]: disabled,
            [styles[width ?? 'default']]: width
          },
          className
        )}
        onClick={onClick} // обработчик клика
        disabled={disabled} // отключение кнопки
      >
        {children}
      </button>
    </>
  );
};

export default Button;
