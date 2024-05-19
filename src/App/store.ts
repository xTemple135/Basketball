import { playersSlice, teamsSlice, userSlice } from '@/Entities';
import { sideBarSlice } from '@/Widgets';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: userSlice,
    teams: teamsSlice,
    players: playersSlice,
    side: sideBarSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
