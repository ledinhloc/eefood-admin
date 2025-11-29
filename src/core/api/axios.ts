import axios from 'axios';
import { toast } from 'sonner';
import { store } from '../store/store';
import {
  logout,
  resetApiState,
  updateAccessToken,
  updateRefreshToken,
} from '@/features/auth/slices/authSlice.ts';
import { resetUI } from '@/core/store/slices/uiSlice.ts';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8222/api/v1',
});

let lastNetworkErrorToast = 0;
let lastServerErrorToast = 0;
const TOAST_COOLDOWN = 5000;

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Hàm helper để xử lý logout và reset UI
const handleLogoutAndReset = (message: string) => {
  // XÓA activeTab để reset về dashboard
  localStorage.removeItem('activeTab');

  store.dispatch(logout());
  store.dispatch(resetApiState());

  store.dispatch(resetUI());
  toast.error(message);
  window.location.href = '/login';
};

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('accessToken');
    if (!token) {
      token = sessionStorage.getItem('accessToken');
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 and 403
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const now = Date.now();
    const originalRequest = error.config;

    // Xử lý lỗi 401 - Token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken =
        localStorage.getItem('refreshToken') ||
        sessionStorage.getItem('refreshToken');

      if (!refreshToken) {
        handleLogoutAndReset(
          'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        );
        return Promise.reject(error);
      }

      try {
        // Gọi API refresh token với đúng format
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8222/api/v1'}/auth/refresh`,
          {
            refreshToken: refreshToken,
          }
        );

        const newAccessToken =
          response.data.data?.access_token || response.data.data?.accessToken;
        const newRefreshToken =
          response.data.data?.refresh_token || response.data.data?.refreshToken;

        if (!newAccessToken) {
          throw new Error('No access token in refresh response');
        }

        // Cập nhật token mới
        store.dispatch(updateAccessToken(newAccessToken));
        if (newRefreshToken) {
          store.dispatch(updateRefreshToken(newRefreshToken));
        }

        // Cập nhật header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Xử lý các request đang đợi
        processQueue(null, newAccessToken);

        // Retry request ban đầu
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        processQueue(refreshError, null);
        handleLogoutAndReset(
          'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        );
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Xử lý lỗi 403
    if (error.response?.status === 403) {
      handleLogoutAndReset('Bạn không có quyền truy cập.');
    }
    // Xử lý lỗi network
    else if (!error.response) {
      if (now - lastNetworkErrorToast > TOAST_COOLDOWN) {
        toast.error(
          'Network Error: Unable to connect to the server. Please check your internet connection.'
        );
        lastNetworkErrorToast = now;
      }
    }
    // Xử lý lỗi server
    else if (error.response?.status >= 500) {
      if (now - lastServerErrorToast > TOAST_COOLDOWN) {
        toast.error(
          'Server Error: Something went wrong on our end. Please try again later.'
        );
        lastServerErrorToast = now;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
