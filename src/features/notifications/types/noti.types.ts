export interface NotificationResponse {
  id: number;
  notificationId: number;
  title: string;
  body: string;
  type: string;
  path: string;
  avatarUrl: string;
  postImageUrl: string;
  read: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface NotificationRequest {
  page: number;
  limit: number;
}

export interface NotificationPageResponse {
  message: string;
  data: {
      content: NotificationResponse[];
      totalPages: number;
      totalElements: number;
      number: number;
      size: number;
    };
}