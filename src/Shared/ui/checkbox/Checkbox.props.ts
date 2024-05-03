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
   * Обработчик изменений
   */
  onChange?: (isChecked: boolean) => void;
  /**
   * Дочерние элементы
   */
  children?: React.ReactNode;
}
