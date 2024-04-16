import React, { useCallback, useEffect, useState } from 'react';
import { IInputProps } from './inputProps';
import debounce from 'lodash.debounce';
import styles from './Input.module.scss';
import cn from 'classnames';
import searchIcon from '@/Shared/assets/icons/search_rounded.svg';

const Input: React.FC<IInputProps> = ({
  modeValue = '',
  label = '',
  error = '',
  disabled = false,
  isSearch = false,
  type = 'text',
  placeholder = '',
  width = '366px',
  timeInterval = 1000
}) => {
  const [valueText, setValueText] = useState(modeValue);
  const [inputId] = useState(Math.random().toString());
  useEffect(() => {
    setValueText(modeValue);
  }, [modeValue]);
  const debounceChange = useCallback(
    debounce((value) => setValueText(value), timeInterval),
    [timeInterval]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueText(event.target.value);
    debounceChange(event.target.value);
  };

  return (
    <div className={styles['input-ui']} style={{ width }}>
      {label && (
        <label htmlFor={inputId} className={styles['input-ui_label']}>
          {label}{' '}
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
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={valueText}
          onChange={handleChange}
          className={cn({
            [styles.error]: error,
            [styles.disabled]: disabled,
            [styles.search]: isSearch
          })}
        />
        <div className={styles['input-ui_block_icon']}>
          {isSearch && <img src={searchIcon} alt="icon-search" />}
        </div>
      </div>
      {error && <div className={styles['input-ui_errorText']}>{error}</div>}
    </div>
  );
};

export default Input;
