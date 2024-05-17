export interface Option {
  value: number;
  label: string;
}

export interface CardSelectInterface {
  value: Option | number | null | string;
  onChange: (selectedOption: Option | null) => void;
  customWidth?: string;
  options?: Option[] | undefined;
  menuPlacement?: 'top' | 'bottom';
  label?: string;
  bordered?: boolean;
  className?: string;
}

export const options: Option[] = [
  { value: 6, label: '6' },
  { value: 12, label: '12' },
  { value: 24, label: '24' }
];
