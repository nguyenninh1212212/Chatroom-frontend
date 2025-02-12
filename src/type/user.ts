export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  fullname: string;
  email: string;
}

export interface UserInfo {
  id: string;
  fullname: string;
  email: string;
  created: string;
  update: string;
}
