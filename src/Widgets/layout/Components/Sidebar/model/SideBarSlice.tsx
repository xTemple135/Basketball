import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface SideBarState {
  isSidebarOpen: boolean;
}

const initialState: SideBarState = {
  isSidebarOpen: false
};

export const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    }
  }
});

export const { toggleSideBar, setIsOpen } = sideBarSlice.actions;
export default sideBarSlice.reducer;
