import React, { useEffect, useRef, useState } from 'react';
import { ImageLoaderProps } from './ImageLoader.props';
import styles from './ImageLoader.module.scss';
import addPhoto from '@/Shared/assets/icons/add_photo_rounded.svg';

// Компонент ImageLoader, который позволяет загружать изображения
const ImageLoader: React.FC<ImageLoaderProps> = ({ value, onChange, className}) => {
  const fileInput = useRef<HTMLInputElement>(null); // ссылка на input файл
  const [imageUrl, setImageUrl] = useState<string>(''); // загруженное изображение
  const [errorMessage, setErrorMessage] = useState<string>(''); // сообщение об ошибке

  // useEffect для обновления URL изображения при изменении значения
  useEffect(() => {
    if (value) {
      setImageUrl(
        typeof value === 'string' ? value : URL.createObjectURL(value as Blob)
      );
    }
  }, [value]);

  // Обработчик клика, который открывает диалог выбора файла
  const onClick = () => {
    fileInput.current?.click();
  };

  // Обработчик изменения файла
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateImage(file)) {
      setImageUrl(URL.createObjectURL(file));
      onChange(file); // Передача файла в родительский компонент
    }
  };

  // Функция для проверки, является ли файл изображением
  const validateImage = (file: File): boolean => {
    if (!file) return false;
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Файл не является изображением');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  return (
    <div className={`${styles['imageLoader']} ${className}`} onClick={onClick}>
      <div className={styles['imageLoader-content']}>
        {imageUrl ? (
          <img
            className={styles['uploadedImage']}
            src={imageUrl}
            alt="select"
          />
        ) : (
          <div className={styles['imageLoader-overlay']}>
            <img src={addPhoto} alt="Add image icon" />
          </div>
        )}
      </div>
      <input
        ref={fileInput}
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        onChange={onChangeFile}
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage} </div>}
    </div>
  );
};

export default ImageLoader;
