export interface PlayerInterface {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
  [key: string]: string | number; // индексная сигнатура для строковых ключей
}

export interface PlayerState {
  data: PlayerInterface[];
  count: number;
  page: number;
  size: number;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  positions: string[];
}

export interface FetchPlayersParams {
  Name?: string;
  Page?: number;
  PageSize?: number;
  TeamIds?: number[];
}
