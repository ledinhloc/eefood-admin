import type { NotificationResponse } from '@/features/notifications/types/noti.types.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  unreadCount: number;
  notifications: NotificationResponse[];
  isOpen: boolean;
}

const initialState: NotificationState = {
  unreadCount: 0,
  notifications: [],
  isOpen: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    decrementUnreadCount: (state) => {
      if (state.unreadCount > 0) {
        state.unreadCount -= 1;
      }
    },
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
    },
    setNotifications: (
      state,
      action: PayloadAction<NotificationResponse[]>
    ) => {
      state.notifications = action.payload.map((n) => ({
        ...n,
        createdAt: n.createdAt ? String(n.createdAt) : new Date().toISOString(),
        readAt: n.readAt ? String(n.readAt) : null,
      }));
    },
    addNotification: (state, action: PayloadAction<NotificationResponse>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
        notification.readAt = new Date().toISOString();
        if (state.unreadCount > 0) {
          state.unreadCount -= 1;
        }
      }
    },
    markAllNotificationsAsRead: (state) => {
      const nowIso = new Date().toISOString();
      state.notifications.forEach((n) => {
        if (!n.read) {
          n.read = true;
          n.readAt = nowIso;
        }
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload
      );
      if (index !== -1) {
        if (!state.notifications[index].read && state.unreadCount > 0) {
          state.unreadCount -= 1;
        }
        state.notifications.splice(index, 1);
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    toggleNotificationPanel: (state) => {
      state.isOpen = !state.isOpen;
    },
    setNotificationPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const {
  setUnreadCount,
  incrementUnreadCount,
  decrementUnreadCount,
  resetUnreadCount,
  setNotifications,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearAllNotifications,
  toggleNotificationPanel,
  setNotificationPanelOpen,
} = notificationSlice.actions;

export default notificationSlice.reducer;
