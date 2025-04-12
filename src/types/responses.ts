// types/responses.ts

export interface RegisterResponse {
  message: string;
  user: {
    _id: string;
    email: string;
    fullName: string;
  };
  token: string;
}

export interface LoginResponse {
  message: string;
  user: {
    _id: string;
    email: string;
    fullName: string;
  };
  token: string;
}

export interface ProfileResponse {
  user: {
    _id: string;
    email: string;
    fullName: string;
    profilePicture?: string;
  };
}
