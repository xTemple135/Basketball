export interface ICheckBoxProps {
  /**
   * Активный чекбокс
   */
  isChecked?: boolean;
  /**
   * Отключен ли чекбокс
   */
  disabled?: boolean;
  /**
   * Текст ошибки
   */
  error?: string;

  /**
   * Дочерние элементы
   */
  children?: React.ReactNode;
}
