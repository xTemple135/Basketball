export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Текст ввода
   */
  modeValue?: string;

  /**
   * Заголовк
   */

  label?: string;

  /**
   * Заблокировать ввод
   */

  disabled?: boolean;

  /**
   * Режим поиска
   */

  isSearch?: boolean;
  /**
   * * Минимальный таймаут ввода
   */
  timeInterval?: number;

  /**
   * Текст ошибки
   */
  error?: string;

  /**
   * Текст ввода
   */
  type?: string;

  /**
   * Пустое поле
   */
  placeholder?: string;
  /**
   * Ширина поля
   */
  width?: string;

}
