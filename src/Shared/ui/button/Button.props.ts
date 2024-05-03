import { ButtonHTMLAttributes } from 'react';

export type ButtonSize = 'Small' | 'Medium' | 'Large' | 'Pagination';
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Вторичная кнопка
   */
  secondary?: boolean;
  /**
   * Размер кнопки
   */
  width?: ButtonSize;
  /**
   * Состояние кнопки
   */
  disabled?: boolean;

  /**
   * Обработчик клика по кнопке
   */

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
