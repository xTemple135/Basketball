import React from 'react';
import { IPageHeadersProps } from './HeadersPage.props';
import styles from './HeadersPage.module.scss';
import IconEdit from '@/Shared/assets/icons/create_rounded.svg';
import IconDelete from '@/Shared/assets/icons/delete_rounded.svg';

const HeadersPage: React.FC<IPageHeadersProps> = ({
  paths, // пути страницы 
  controlsVisible, // Видимость элементов управления 
  onEdit, //  событие редактирования
  onDelete //  событие удаления
}) => {
  return (
    <div className={styles['HeaderPage']}>
       {/* Отображение путей страницы */}
      <div className={styles['HeaderPage_path']}>
        {paths.map((path, i) => (
          <div key={path} className={styles['HeaderPage-path_items']}>
            {i > 0 && (
              <div className={styles['HeaderPage-path-items_slash']}>/</div>
            )}
            <span className={styles['HeaderPage-path-items_text']}>{path}</span>
          </div>
        ))}
      </div>
      {/* Отображение элементов управления */}
      {controlsVisible && (
        <div className={styles['HeaderPage_controls']}>
          <img src={IconEdit} alt="edit" onClick={onEdit} />
          <img src={IconDelete} alt="delete" onClick={onDelete} />
        </div>
      )}
    </div>
  );
};

export default HeadersPage;
