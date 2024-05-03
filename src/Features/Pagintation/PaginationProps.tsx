export interface PaginationProps {
  /**
   *  Общее количество элементов
   */
  totalCount: number;
  /**
   * Текущая страница
   */
  currentPage: number;
  /**
   * Количество элементов на странице
   */
  pageSize: number | undefined;

  /**
   * Функция обратного вызова при изменении страницы
   */

  onPageChange: (page: number) => void;
}
