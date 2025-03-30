import createHttpError from "http-errors";
import { User } from "../db/models/User";
import { RegisterUserType } from "../validators/auth/registerUserValidation";
import { LoginUserType } from "../validators/auth/loginUserValidation";
import { compare } from "bcrypt";
import { Session } from "../db/models/Session";
import crypto from "crypto";
import { Response } from "express";
import { ObjectId, Types } from "mongoose";

export const registerUser = async (data: RegisterUserType) => {
  const isUserExist = await User.findOne({ email: data.email });

  if (isUserExist) {
    throw createHttpError(401, "Email is in use");
  }

  return await User.create(data);
};

export const loginUser = async (data: LoginUserType) => {
  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw createHttpError(401, "Unauthorized");
  }

  const isPasswordMatch = await compare(data.password, user.password);

  if (!isPasswordMatch) {
    throw createHttpError(401, "Unauthorized");
  }

  await Session.findOneAndDelete({
    userId: user.id,
  });

  const sessionData = await createSessionData(user.id);
  const session = await Session.create(sessionData);

  return { user, session };
};

export const refreshSession = async (data: {
  sessionToken: string;
  sessionId: Types.ObjectId;
}) => {
  const oldSession = await Session.findOne({
    _id: data.sessionId,
  });

  if (!oldSession) {
    throw createHttpError(404, "Session not found");
  }

  const user = await User.findOne({
    _id: oldSession.userId,
  });

  if (!user) {
    throw createHttpError(404, "User not found or does not exist");
  }

  await Session.deleteOne({
    _id: oldSession._id,
  });

  const sessionData = createSessionData(user.id);
  const session = await Session.create(sessionData);

  return { user, session };
};

export const clearCookies = (res: Response) => {
  res.clearCookie("sessionId", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("sessionToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export const setCookies = (
  res: Response,
  { id, refreshToken }: { id: Types.ObjectId; refreshToken: string }
) => {
  res.cookie("sessionId", id, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.cookie("sessionToken", refreshToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export const createSessionData = (id: Types.ObjectId) => {
  const accessToken = crypto.randomBytes(32).toString("hex");
  const refreshToken = crypto.randomBytes(32).toString("hex");

  return {
    userId: id,
    accessToken: accessToken,
    refreshToken: refreshToken,
    accessTokenValidUntill: new Date(Date.now() + 1000 * 60 * 15),
    refreshTokenValidUntill: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
};

export const logoutUser = async (sessionId: Types.ObjectId) => {
  return await Session.findOneAndDelete({
    _id: sessionId,
  });
};
