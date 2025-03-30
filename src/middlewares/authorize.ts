import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";
import { Session } from "../db/models/Session";
import { User } from "../db/models/User";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return next(createHttpError(401, "Token not found"));
  }

  const [bearer, token] = bearerToken.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(createHttpError(401, "Invalid token"));
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(404, "Session not found or does not exist"));
  }

  if (Date.now() > session.accessTokenValidUntill.getTime()) {
    return next(createHttpError(401, "Token is expired"));
  }

  const user = await User.findOne({ _id: session.userId });

  if (!user) {
    return next(createHttpError(404, "User not found or does not exist"));
  }

  req.user = {
    name: user.name,
    id: user.id,
    email: user.email,
    points: user.points,
  };
  next();
};
