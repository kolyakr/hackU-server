import { Request } from "express";
import { UserType } from "./user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

export {};
