import { Request, Response } from "express";
import { getUsersLeaderbord } from "../service/user";

export const getUserCtrl = async (req: Request, res: Response) => {
  const user = req.user;
  res.json({
    user: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    },
  });
};

export const getUsersLeaderbordCtrl = async (req: Request, res: Response) => {
  const users = await getUsersLeaderbord();

  res.json({
    users: users,
  });
};
