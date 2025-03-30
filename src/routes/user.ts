import { Router } from "express";
import { authorize } from "../middlewares/authorize";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { getUserCtrl, getUsersLeaderbordCtrl } from "../controllers/user";

export const userRouter = Router();

userRouter.get("/me", authorize, ctrlWrapper(getUserCtrl));

userRouter.get("/all", authorize, ctrlWrapper(getUsersLeaderbordCtrl));
