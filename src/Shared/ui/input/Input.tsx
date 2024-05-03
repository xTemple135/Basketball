// Input.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { IInputProps } from './inputProps';
import debounce from 'lodash.debounce';
import styles from './Input.module.scss';
import cn from 'classnames';
import searchIcon from '@/Shared/assets/icons/search_rounded.svg';

const Input: React.FC<IInputProps> = ({
  register, // Функция регистрации поля формы в React-hook-form
  name = '', // Имя поля
  modeValue = '', // Значение поля
  label = '', // Надпись для поля
  error = '', // Ошибка поля
  disabled = false, // Состояние отключенного поля
  isSearch = false, // Поле для поиска
  type = 'text', // Тип поля
  placeholder = '',
  width = '366px', // Размер поля
  timeInterval = 1000, // интервал для debounce
  clearErrors, // Функция для очистки ошибок react hook-form
  onSearch
}) => {
  const [valueText, setValueText] = useState(modeValue); // Состояние для значения поля
  const [inputId] = useState(Math.random().toString()); // Случайный ID для поля
  useEffect(() => {
    setValueText(modeValue);
  }, [modeValue]);
// Input.tsx
const debounceChange = useCallback(
  debounce((value) => {
    setValueText(value);
    if (onSearch) {  // вызов обрабочтика поиска, если он определен
      onSearch(value);
    }
  }, timeInterval),
  [timeInterval, onSearch]
);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueText(event.target.value);
    debounceChange(event.target.value)
    clearErrors ? clearErrors(name) : '';
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
          {...(register
            ? register(name, {
                //  Если функция register предоставлена, регистрируем поле с именем name
                required: 'Это поле обязательно к заполнению' //  Устанавливаем правило, что поле обязательно для заполнения
              })
            : {})}
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
        {/* Иконка для поиска */}
        <div className={styles['input-ui_block_icon']}>
          {isSearch && <img src={searchIcon} alt="icon-search" />}
        </div>
      </div>
      {/* Отображение ошибки */}
      {error && <div className={styles['input-ui_errorText']}>{error}</div>}
    </div>
  );
};

export default Input;
