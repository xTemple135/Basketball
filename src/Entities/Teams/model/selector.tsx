import { RootState } from '@/App/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectTeamById = createSelector(
  (state: RootState) => state.teams.data,
  (_: RootState, id: number) => id,
  (teams, id) => teams.find((team) => team.id === id)
);
