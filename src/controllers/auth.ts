import { Request, Response } from "express";
import { getUserProfile, loginUser, registerUser } from "../service/auth";
import { LoginResponse, RegisterResponse } from "../types/responses";

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, fullName } = req.body;

  const result: RegisterResponse = await registerUser(
    email,
    password,
    fullName
  );
  res.status(201).json(result);
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  const result: LoginResponse = await loginUser(email, password);
  res.status(200).json(result);
};

export const profileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(400).json({ error: "No token provided" });
    return;
  }
  const result = await getUserProfile(token);
  res.status(200).json(result);
};
