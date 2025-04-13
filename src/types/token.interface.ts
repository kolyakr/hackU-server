import { Types } from "mongoose";

export interface Token {
  name?: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: Types.ObjectId;
  sub: string;
  iat: number;
  exp: number;
  email?: string;
  email_verified: boolean;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
  uid: string;
}
