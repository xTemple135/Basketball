import { AuthResponse } from './AuthResponse';

export interface AuthState extends AuthResponse {
  status: 'idle' | 'loading' | 'failed';
  signInError: string | null | undefined;
  signUpError: string | null | undefined;
}
