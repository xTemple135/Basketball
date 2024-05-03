export interface IPageHeadersProps {
  //  Массив для отображения путей
  paths: string[];
  // Панель с элементами управления
  controlsVisible?: boolean;
  // Функция для вызова редактора данных карточки
  onEdit?: () => void;
  // Функция для удаления карточки
  onDelete?: () => void;
}
