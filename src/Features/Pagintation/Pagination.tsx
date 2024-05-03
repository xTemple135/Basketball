import React, { useMemo } from 'react';
import { PaginationProps } from './PaginationProps';
import styles from './Pagination.module.scss';
import cn from 'classnames';

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  pageSize,
  onPageChange
}) => {
  // Общее колличество страниц
  const totalPages = useMemo(() => {
    if (pageSize === undefined) return 0; // Если page не опередел, то вернем 0
    return Math.ceil(totalCount / pageSize);
  }, [totalCount, pageSize]);

  // Массив номеров страниц
  const pageNumbers = useMemo(() => {
    const range: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }, [totalPages]);
  return (
    <div className={styles['Pagination-wrapper']}>
      <div className={styles['Pagination-content']}>
        <button
          className={styles['Pagination-item']}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={cn(styles['Pagination-item'], {
              [styles['active']]: page === currentPage
            })}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={styles['Pagination-item']}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
