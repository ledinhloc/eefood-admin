import { api } from '@/core/api/api.ts';
import type {
  NotificationPageResponse,
  NotificationRequest,
} from '@/features/notifications/types/noti.types.ts';

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotification: builder.query<
      NotificationPageResponse,
      NotificationRequest
    >({
      query: (params) => ({
        url: '/notifications',
        method: 'GET',
        params,
      }),
      providesTags: ['Notifications'],
    }),
    getUnreadCount: builder.query<{ data: number }, void>({
      query: () => ({
        url: '/notifications/unread-count',
        method: 'GET',
      }),
      providesTags: ['UnreadCount'],
    }),
    markAsRead: builder.mutation<void, number>({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notifications', 'UnreadCount'],
    }),
    markAllAsRead: builder.mutation<void, void>({
      query: () => ({
        url: '/notifications/read-all',
        method: 'PUT',
      }),
      invalidatesTags: ['Notifications', 'UnreadCount'],
    }),

    deleteNotification: builder.mutation<void, number>({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications', 'UnreadCount'],
    }),
    deleteAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: '/notifications/delete-all',
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications', 'UnreadCount'],
    }),
  }),
});

export const {
  useGetUserNotificationQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
} = notificationApi;
