import { Request } from "express";
import { UserType } from "./user.interface";
import { Token } from "./token.interface";

declare global {
  namespace Express {
    interface Request {
      token?: Token;
    }
  }
}

export {};
