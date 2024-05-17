import React from 'react'
import Select from 'react-select';
import { MultiOption, MultiTeamSelectProps } from './MultiSelect.props';
import './MultiSelect.scss'

const MultiTeamSelect: React.FC<MultiTeamSelectProps> = ({
    value,
    onChange,
    customWidth = `88px`,
    options,
    menuPlacement = 'top',
    label,
  }) => {
  
    return (
        <div  className={'custom-select_wrapper'} style={{ width: customWidth }}>
        <label className="custom-select_label">{label}</label>
        <Select
          options={options}
          value={value}
          onChange={(selectedOption) => onChange(selectedOption as MultiOption[] | null)} // изменекние текущего значения
          className={`custom-select-container`} // класс  для контейнера компонента
          classNamePrefix="custom-select" // для пользовательских стилей
          menuPlacement={menuPlacement} // расположение списка вверх
          isMulti
        />
      </div>
    );
  };
  
  export default MultiTeamSelect;