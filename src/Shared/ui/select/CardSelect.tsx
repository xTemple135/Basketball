import React from 'react';
import { CardSelectInterface, Option } from './CardSelect.props';
import Select from 'react-select';
import './CardSelect.scss';

const CardSelect: React.FC<CardSelectInterface> = ({ value, onChange }) => {
  // Значения, для выборки количества карточек на странице
  const options: Option[] = [
    { value: 6, label: '6' },
    { value: 12, label: '12' },
    { value: 24, label: '24' }
  ];

  return (
    <Select
      options={options} // передаем значения
      value={value} // текущее значение 
      onChange={(selectedOption) => onChange(selectedOption as Option)} // изменекние текущего значения
      className="custom-select-container" // класс  для контейнера компонента
      classNamePrefix="custom-select" // для пользовательских стилей
      menuPlacement="top" // расположение списка вверх 
    />
  );
};

export default CardSelect;
