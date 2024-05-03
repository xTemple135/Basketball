import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TeamsInterface, TeamsState } from './model';
import axios from 'axios';
import { PREFIX } from '@/Shared/ui';
import { getToken } from '@/Features';

interface FetchTeamsParams {
  Name?: string;
  Page?: number;
  PageSize?: number;
}
// получение данных о командах
export const teamsItems = createAsyncThunk<
  TeamsState,
  FetchTeamsParams,
  { rejectValue: string }
>('teams/fetchTeams', async (params, thunkAPI) => {
  try {
    const token = getToken();
    const response = await axios.get<TeamsState>(
      `${PREFIX}/api/Team/GetTeams`,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Данные не найдены');
  }
});

export const TeamsAdd = createAsyncThunk<
  TeamsInterface,
  TeamsInterface,
  {
    rejectValue: { message: string };
  }
>('teams/addTeam', async (newTeam, thunkAPI) => {
  try {
    const token = getToken();
    const response = await axios.post<TeamsInterface>(
      `${PREFIX}/api/Team/Add`,
      newTeam,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return thunkAPI.rejectWithValue({
        message: 'Такая команда уже cуществует'
      });
    }
  }
  return thunkAPI.rejectWithValue({
    message: 'Произошла ошибка'
  });
});

const initialState: TeamsState = {
  data: [],
  count: 0,
  page: 0,
  size: 0,
  status: 'idle',
  error: null
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    errorClear: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(teamsItems.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      teamsItems.fulfilled,
      (state, action: PayloadAction<TeamsState>) => {
        state.status = 'idle';
        state.data = action.payload.data;
        state.count = action.payload.count;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.status = action.payload.status;
      }
    );
    builder.addCase(
      teamsItems.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload;
      }
    );

    builder.addCase(TeamsAdd.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      TeamsAdd.fulfilled,
      (state, action: PayloadAction<TeamsInterface>) => {
        state.status = 'idle';
        state.data.push(action.payload);
      }
    );
    builder.addCase(
      TeamsAdd.rejected,
      (state, action: PayloadAction<{ message: string } | undefined>) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      }
    );
  }
});

export const {errorClear} = teamsSlice.actions

export default teamsSlice.reducer;
