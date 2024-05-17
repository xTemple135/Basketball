import React, { useCallback, useEffect, useState } from 'react';
import { IInputProps } from './inputProps';
import debounce from 'lodash.debounce';
import styles from './Input.module.scss';
import cn from 'classnames';
import searchIcon from '@/Shared/assets/icons/search_rounded.svg';

const Input: React.FC<IInputProps> = ({
  register,
  name = '',
  label = '',
  error = '',
  disabled = false,
  isSearch = false,
  type = 'text',
  placeholder = '',
  width = '366px',
  timeInterval,
  clearErrors,
  onSearch,
  className
}) => {
  const [inputId] = useState(Math.random().toString());

  const debounceChange = useCallback(
    debounce((value) => {
      if (onSearch) {
        onSearch(value);
      }
    }, timeInterval),
    [timeInterval, onSearch]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounceChange(event.target.value);
    clearErrors ? clearErrors(name) : '';
  };

  return (
    <div className={cn(styles['input-ui'], className)} style={{ width }}>
      {label && (
        <label htmlFor={inputId} className={styles['input-ui_label']}>
          {label}
        </label>
      )}
      <div
        className={cn(styles['input-ui_block'], {
          [styles.error]: error,
          [styles.disabled]: disabled,
          [styles.search]: isSearch
        })}
      >
        <input
          {...register?.(name, {
            required: 'Это поле обязательно к заполнению'
          })}
          id={inputId}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          className={cn({
            [styles.error]: error,
            [styles.disabled]: disabled,
            [styles.search]: isSearch
          })}
        />
        {isSearch && (
          <div className={styles['input-ui_block_icon']}>
            <img src={searchIcon} alt="icon-search" />
          </div>
        )}
      </div>
      {error && <div className={styles['input-ui_errorText']}>{error}</div>}
    </div>
  );
};

export default Input;
