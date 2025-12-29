import { useAppDispatch, useAppSelector } from '@/core/store/store';
import {
  useDeleteAllNotificationsMutation,
  useDeleteNotificationMutation,
  useGetUserNotificationQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from '@/features/notifications/services/notificationApi.ts';
import {
  clearAllNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  removeNotification,
  setNotificationPanelOpen,
  setNotifications,
} from '@/features/notifications/slices/notificationSlice.ts';
import { Bell, Check, ChevronRight, Loader2, Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '@/assets/avatar.png';

export const NotificationPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isOpen, notifications } = useAppSelector((s) => s.notification);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUserNotificationQuery(
    {
      page,
      limit: 10,
    },
    {
      skip: !isOpen, //Chỉ fetch khi panel mở
    }
  );

  const isInitialized = useRef(false);

  useEffect(() => {
    if (data?.data?.content) {
      if (!isInitialized.current || page === 1) {
        // Lần đầu hoặc reset về trang 1
        dispatch(setNotifications(data.data.content));
        isInitialized.current = true;
      } else {
        // Load more: append thêm notifications
        const existingIds = new Set(notifications.map((n) => n.id));
        const newNotifications = data.data.content.filter(
          (n) => !existingIds.has(n.id)
        );
        if (newNotifications.length > 0) {
          dispatch(setNotifications([...notifications, ...newNotifications]));
        }
      }
    }
  }, [data?.data?.content]);

  useEffect(() => {
    if (!isOpen) {
      setPage(1);
      isInitialized.current = false;
    }
  }, [isOpen]);

  const [markAsReadApi] = useMarkAsReadMutation();
  const [markAllReadApi] = useMarkAllAsReadMutation();
  const [deleteNotiApi] = useDeleteNotificationMutation();
  const [deleteAllApi] = useDeleteAllNotificationsMutation();

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handlePreview = (targetUrl: string) => {
    navigate(`${targetUrl}`);
  };

  return (
    <div className="absolute right-4 top-16 w-[380px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-orange-100 dark:border-orange-900/30 overflow-hidden z-[100]">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-white" />
            <h2 className="font-bold text-lg text-white">Thông báo</h2>
            {unreadCount > 0 && (
              <span className="bg-white text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={() => dispatch(setNotificationPanelOpen(false))}
            className="p-1.5 hover:bg-orange-600 dark:hover:bg-orange-700 rounded-lg transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center px-4 py-2 bg-orange-50 dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700">
        <button
          onClick={async () => {
            await markAllReadApi();
            dispatch(markAllNotificationsAsRead());
          }}
          className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors flex items-center gap-1"
        >
          <Check size={14} />
          Đánh dấu tất cả đã đọc
        </button>

        <button
          onClick={async () => {
            await deleteAllApi();
            dispatch(clearAllNotifications());
          }}
          className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center gap-1"
        >
          <Trash2 size={14} />
          Xoá tất cả
        </button>
      </div>

      {/* Body */}
      <div className="max-h-[420px] overflow-y-auto px-3 py-2">
        {isLoading && page === 1 && (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-orange-500" size={32} />
          </div>
        )}

        {!isLoading && notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell
              size={48}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-3"
            />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Chưa có thông báo nào
            </p>
          </div>
        )}

        <div className="space-y-1.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex gap-2.5 p-2.5 rounded-xl border transition-all hover:shadow-md${
                !n.read
                  ? 'border-orange-200 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-900/50 cursor-pointer'
                  : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer'
              }`}
              onClick={async () => {
                // Optimistic update trước
                dispatch(markNotificationAsRead(n.id));
                // Gọi API
                await markAsReadApi(n.id);

                handlePreview(n.path);
              }}
            >
              {/* Avatar with status indicator */}
              <div className="relative flex-shrink-0">
                <img
                  src={
                    n.avatarUrl ??
                    avatar
                  }
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                />
                {!n.read && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-orange-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-1">
                  {n.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-0.5">
                  {n.body}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleString('vi-VN')}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                {!n.read && (
                  <button
                    onClick={async () => {
                      // Optimistic update trước
                      dispatch(markNotificationAsRead(n.id));
                      // Gọi API
                      await markAsReadApi(n.id);
                    }}
                    className="p-1.5 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg transition-colors text-orange-600 dark:text-orange-400"
                    title="Đánh dấu đã đọc"
                  >
                    <Check size={14} />
                  </button>
                )}

                <button
                  onClick={async () => {
                    // Optimistic update trước
                    dispatch(removeNotification(n.id));
                    // Gọi API
                    await deleteNotiApi(n.id);
                  }}
                  className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-500 dark:text-red-400"
                  title="Xoá"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Loading more indicator */}
        {isLoading && page > 1 && (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin text-orange-500" size={24} />
          </div>
        )}
      </div>

      {/* Pagination: Load More */}
      {data && data.data.totalPages > page && (
        <div className="border-t border-orange-100 dark:border-gray-800 p-3">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={isLoading}
            className="w-full py-2.5 text-center text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors flex items-center justify-center gap-1 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Xem thêm thông báo
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      )}
    </div>
  );
};
