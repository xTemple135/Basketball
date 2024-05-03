export interface TeamsInputInterface {
  name: string;
  label: string;
  type?: string;
  required: boolean;
}

export const teamsInput: TeamsInputInterface[] = [
  { name: 'name', label: 'Name', required: true },
  { name: 'division', label: 'Division', required: true },
  { name: 'conference', label: 'Conference', required: true },
  {
    name: 'foundationYear',
    label: 'Year of foundation',
    type: 'number',
    required: true
  }
];
