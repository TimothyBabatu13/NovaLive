export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  isStreaming: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Stream {
  id: string;
  title: string;
  description?: string;
  gameId?: string;
  thumbnail?: string;
  isLive: boolean;
  viewerCount: number;
  streamKey: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  streamId: string;
  createdAt: string;
  user: User;
}

export interface Follow {
  id: string;
  userId: string;
  followingId: string;
  createdAt: string;
  user: User;
  following: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
