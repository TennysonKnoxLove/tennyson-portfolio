export interface LoginRequest {
  username: string;
}

export interface UserResponse {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: UserResponse;
  message: string;
} 