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

export interface NotificationParam {
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

export interface NotificationRequest {
  title: string;
  body: string;
  path?: string | null;
  avatarUrl?: string | null;
  postImageUrl?: string | null;
  type: string;
  userId?: number | null;
}