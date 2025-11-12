export interface Address {
  city: string;
  street: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  dob?: string;
  gender?: string;
  address?: Address;
  provider?: string;
  avatarUrl?: string;
  backgroundUrl?: string;
  allergies?: string[];
  eatingPreferences?: string[];
  dietaryPreferences?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number; // 200
  message: string; // "Success"
  data: {
    id: number;
    username: string;
    email: string;
    role: string;
    dob?: string;
    gender?: string;
    address?: {
      city: string;
      street: string;
    };
    provider?: string;
    avatarUrl?: string;
    backgroundUrl?: string;
    allergies?: string[];
    eatingPreferences?: string[];
    dietaryPreferences?: string[];
    accessToken: string;
    refreshToken: string;
  };
}


export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
