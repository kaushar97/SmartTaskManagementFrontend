export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  jwtToken: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  roles?: string[];
}

export interface CurrentUser {
  identityUserId: string;
  email: string;
  username: string;
  roles: string[];
}

export interface RegisterFormData {
    firstName: string;
    lastName?: string;
    username: string;
    password: string;
    confirmPassword: string;
}
