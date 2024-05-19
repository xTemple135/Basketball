import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchPlayersParams, PlayerInterface, PlayerState } from './model';
import axios from 'axios';
import { Option, PREFIX } from '@/Shared/ui';
import { getToken } from '@/Features';

const token = getToken();

export const GetPlayers = createAsyncThunk<
  PlayerState,
  FetchPlayersParams,
  { rejectValue: string }
>('players/GetPlayers', async (params, thunkAPI) => {
  try {
    const response = await axios.get<PlayerState>(
      `${PREFIX}/api/Player/GetPlayers`,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Данные отсутствуют');
  }
});

export const AddPlayer = createAsyncThunk<
  PlayerInterface,
  PlayerInterface,
  { rejectValue: string }
>('players/AddPlayer', async (playerData, thunkAPI) => {
  try {
    const response = await axios.post<PlayerInterface>(
      `${PREFIX}/api/Player/Add`,
      playerData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Не удалось добавить игрока');
  }
});

export const PlayerUpdate = createAsyncThunk<
  PlayerInterface,
  PlayerInterface,
  { rejectValue: string }
>('players/PlayerUpdate', async (updatePlayer, thunkAPI) => {
  try {
    const response = await axios.put<PlayerInterface>(
      `${PREFIX}/api/Player/Update`,
      updatePlayer,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Произошла ошибка');
  }
});

export const GetPositions = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('players/GetPositions', async (_, thunkAPI) => {
  try {
    const response = await axios.get<string[]>(
      `${PREFIX}/api/Player/GetPositions`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Не удалось получить данные о позициях');
  }
});

const initialState: PlayerState = {
  data: [],
  count: 0,
  page: 0,
  size: 0,
  status: 'idle',
  error: null,
  positions: []
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetPlayers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      GetPlayers.fulfilled,
      (state, action: PayloadAction<PlayerState>) => {
        state.status = 'idle';
        state.data = action.payload.data;
        state.count = action.payload.count;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.status = action.payload.status;
      }
    );
    builder.addCase(
      GetPlayers.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || null;
      }
    );
    builder.addCase(
      AddPlayer.fulfilled,
      (state, action: PayloadAction<PlayerInterface>) => {
        state.status = 'idle';
        state.data.push(action.payload);
      }
    );
    builder.addCase(PlayerUpdate.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      PlayerUpdate.fulfilled,
      (state, action: PayloadAction<PlayerInterface>) => {
        state.status = 'idle';
        const index = state.data.findIndex(
          (player) => player.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      }
    );
    builder.addCase(
      PlayerUpdate.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || null;
      }
    );
    builder.addCase(GetPositions.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(GetPositions.fulfilled, (state, action) => {
      state.status = 'idle';
      state.positions = action.payload;
    });
  }
});

export default playersSlice.reducer;
