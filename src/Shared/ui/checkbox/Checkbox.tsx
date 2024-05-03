import React, { useState } from 'react';
import iconSuccess from '@/Shared/assets/icons/checkbox_success.svg';
import { ICheckBoxProps } from './Checkbox.props';
import styles from './Checkbox.module.scss';
import cn from 'classnames';

const CheckBox: React.FC<ICheckBoxProps> = ({
  isChecked,
  disabled,
  error,
  children,
  onChange
}) => {
  const [checked, setChecked] = useState<boolean>(isChecked || false);
  const toggleCheckbox = () => {
    if (!disabled) {
      setChecked(!checked);
      onChange && onChange(!checked);
    }
  };
  return (
    <div
      className={cn(styles['checkbox-ui_wrapper'], {
        [styles['active']]: checked,
        [styles['disabled']]: disabled,
        [styles['error']]: error && !checked
      })}
      onClick={toggleCheckbox}
    >
      <div className={cn(styles['checkbox-ui'])}>
        {checked && <img src={iconSuccess} alt="Icon-done" />}
      </div>
      {children}
    </div>
  );
};

export default CheckBox;
