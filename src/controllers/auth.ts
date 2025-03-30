import { Request, Response } from "express";
import {
  clearCookies,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  setCookies,
} from "../service/auth";

export const registerUserCtrl = async (req: Request, res: Response) => {
  const data = req.body;

  const user = await registerUser(data);

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export const loginUserCtrl = async (req: Request, res: Response) => {
  const data = req.body;

  const { user, session } = await loginUser(data);

  clearCookies(res);
  setCookies(res, { id: session._id, refreshToken: session.refreshToken });

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: session.accessToken,
    },
  });
};

export const refreshSessionCtrl = async (req: Request, res: Response) => {
  const sessionToken = req.cookies.sessionToken;
  const sessionId = req.cookies.sessionId;

  const { session, user } = await refreshSession({ sessionId, sessionToken });

  clearCookies(res);
  setCookies(res, { id: session._id, refreshToken: session.refreshToken });

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: session.accessToken,
    },
  });
};

export const logoutUserCtrl = async (req: Request, res: Response) => {
  const sessionId = req.cookies.sessionId;
  await logoutUser(sessionId);

  clearCookies(res);

  res.json({});
};
