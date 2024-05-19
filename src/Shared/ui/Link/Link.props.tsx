export interface ILink {
  /**
   * URL, на который указывает ссылка.
   */
  href: string;

  /**
   * Указывает, отключена ли ссылка.
   */
  isDisabled?: boolean;

  /**
   * Содержимое, отображаемое внутри ссылки.
   */
  children: React.ReactNode;

  /**
   * Подчеркнута ли ссылка
   */
  underLine?: boolean;

  classname?: React.ReactNode
}
