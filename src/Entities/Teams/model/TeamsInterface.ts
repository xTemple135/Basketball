export interface TeamsInterface {
  id?: number;
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
}

export interface TeamsState {
  data: TeamsInterface[];
  count: number;
  page: number;
  size: number;
  status?: 'idle' | 'loading' | 'failed';
  error?: null | string;
}
