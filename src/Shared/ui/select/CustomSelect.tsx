import React from 'react';
import { CardSelectInterface, Option } from './CustomSelect.props';
import Select from 'react-select';
import './CustomSelect.scss';

const CustomSelect: React.FC<CardSelectInterface> = ({
  value,
  onChange,
  customWidth = `88px`,
  options,
  menuPlacement = 'top',
  label,
  bordered = false,
  className
}) => {
  return (
    <div style={{ width: customWidth }} className={className}>
      <label className="custom-select_label">{label}</label>
      <Select
        options={options}
        value={value}
        onChange={(selectedOption) => onChange(selectedOption as Option | null)} // изменекние текущего значения
        className={`custom-select-container ${bordered ? 'bordered' : ''}`} // класс  для контейнера компонента
        classNamePrefix="custom-select" // для пользовательских стилей
        menuPlacement={menuPlacement} // расположение списка вверх
      />
    </div>
  );
};

export default CustomSelect;
