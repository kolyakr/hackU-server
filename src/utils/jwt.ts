import jwt from "jsonwebtoken";
import { ObjectId, Types } from "mongoose";

export const generateJWT = (userId: Types.ObjectId | string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ userId }, secret, { expiresIn: "1h" });
};

export const verifyJWT = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
