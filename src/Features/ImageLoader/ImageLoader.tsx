import React, { useEffect, useRef, useState } from 'react';
import { ImageLoaderProps } from './ImageLoader.props';
import styles from './ImageLoader.module.scss';
import addPhoto from '@/Shared/assets/icons/add_photo_rounded.svg';

const ImageLoader: React.FC<ImageLoaderProps> = ({ value, onChange }) => {
  // ссылка на input элемент
  const fileInput = useRef<HTMLInputElement>(null);
  // Состояние для URL изображения

  const [imageUrl, setImageUrl] = useState<string>('');
  // Состояние для сообщения об ошибке

  const [errorMessage, setErrorMessage] = useState<string>('');

  // обновление URL изображения при изменении value
  useEffect(() => {
    if (value) {
      setImageUrl(
        typeof value === 'string' ? value : URL.createObjectURL(value as Blob)
      );
    }
  }, [value]);
  // Обработчик нажатия на область загрузки изображения

  const onClick = () => {
    fileInput.current?.click();
  };

  // Обработчик изменения выбранного файла
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateImage(file)) {
      setImageUrl(URL.createObjectURL(file));
      onChange(file);
    }
  };

  // Функция для валидации выбранного файла
  const validateImage = (file: File): boolean => {
    if (!file) return false;
    if (!file.type.startsWith('image/')) {
      // Если тип файла не является изображением, устанавливаем сообщение об ошибке
      setErrorMessage('Файл не является изображением');
      return false;
    }
    // Очистка сообщения об ошибке, если файл прошел валидацию
    setErrorMessage('');
    return true;
  };

  return (
    <div className={styles['imageLoader']} onClick={onClick}>
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
