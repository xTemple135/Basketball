export interface Option {
  value: number;
  label: string;
}

export interface CardSelectInterface {
  value: Option | null;
  onChange: (selectedOption: Option | null) => void;
}
