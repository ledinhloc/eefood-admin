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

const getInitialActiveTab = (): ActiveTab => {
  const storedTab = localStorage.getItem('activeTab') as ActiveTab | null;
  return storedTab ?? 'dashboard';
};

const initialState: UIState = {
    activeTab: getInitialActiveTab(),
    isSidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<ActiveTab>) {
      state.activeTab = action.payload;
      localStorage.setItem('activeTab', action.payload);
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