import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ActiveTab =
    | 'dashboard'
    | 'users'
    | 'posts'
    | 'recipes'
    | 'comments'
    | 'notifications';

interface UIState {
    activeTab: ActiveTab;
    isSidebarOpen: boolean;
}

const initialState: UIState = {
    activeTab: 'dashboard',
    isSidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<ActiveTab>) {
      state.activeTab = action.payload;
      state.isSidebarOpen = false;
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const {
  setActiveTab,
  toggleSidebar,
  setSidebarOpen,
} = uiSlice.actions;

export default uiSlice.reducer;