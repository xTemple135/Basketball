import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthResponse, AuthState } from './model';
import { AuthInterface } from './AuthInterface';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '@/Shared/ui';

/**
 * Авторизация
 */
export const login = createAsyncThunk<
  AuthResponse,
  AuthInterface,
  { rejectValue: string }
>('auth/signIn', async (data, thunkAPI) => {
  try {
    const response = await axios.post<AuthResponse>(
      `${PREFIX}/api/Auth/SignIn`,
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Wrong password. Please, try again.');
  }
});

/**
 * Регистрация
 */

export const regUser = createAsyncThunk<
  AuthResponse,
  AuthInterface,
  { rejectValue: string }
>('auth/signUp', async (data, thunkAPI) => {
  try {
    const response = await axios.post<AuthResponse>(
      `${PREFIX}/api/Auth/SignUp`,
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {  // обработка ошибок
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(
      axiosError.response && axiosError.response.status === 409
        ? 'Пользователь с таким логином уже существует.'
        : 'Что-то пошло не так. Пожалуйста, попробуйте еще раз.'
    );
  }
});

const initialState: AuthState = {
  name: '',
  avatarUrl: null,
  token: '',
  status: 'idle',
  signInError: null,
  signUpError: null
};
export const userSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    loginLocalStorage: (
      state,
      action: PayloadAction<{ name: string; avatarUrl: string }>
    ) => {
      state.name = action.payload.name;
      state.avatarUrl = action.payload.avatarUrl;
    },
    logout: (state) => {
      state.name = '';
      state.avatarUrl = null;
      state.token = '';
      state.status = 'idle';
      state.signInError = null;
      state.signUpError = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
  },
  extraReducers: (builder) => {
    // Авторизация
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'idle';
        state.name = action.payload.name;
        state.avatarUrl = action.payload.avatarUrl;
        state.token = action.payload.token;
        state.signInError = null;
        localStorage.setItem(
          'token',
          JSON.stringify( action.payload.token)
        );
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            name: action.payload.name,
            avatarUrl: action.payload.avatarUrl
          })
        );
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.signInError = action.payload;
    });

    /**
     * Для регистрации
     */
    builder.addCase(regUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      regUser.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'idle';
        state.name = action.payload.name;
        state.avatarUrl = action.payload.avatarUrl;
        state.token = action.payload.token;
        state.signUpError = null;
        localStorage.setItem(
          'token',
          JSON.stringify(action.payload.token)
        );
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            name: action.payload.name,
            avatarUrl: action.payload.avatarUrl
          })
        );
      }
    );
    builder.addCase(regUser.rejected, (state, action) => {
      state.status = 'failed';
      state.signUpError = action.payload;
    });
  }
});

export const { logout, loginLocalStorage } = userSlice.actions;
export default userSlice.reducer;
