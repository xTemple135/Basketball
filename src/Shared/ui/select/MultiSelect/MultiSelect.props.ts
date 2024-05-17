export interface MultiOption    {
  value: number;
  label: string;
}
export interface MultiTeamSelectProps {
  value: MultiOption[] | MultiOption | null;
  onChange: (selectedOptions: MultiOption | MultiOption[] | null) => void;
  options: MultiOption[];
  customWidth?: string;
  label?: string;
  menuPlacement?: 'top' | 'bottom';
}
