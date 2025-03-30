import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { validate } from "../middlewares/validate";
import { registerUserSchema } from "../validators/auth/registerUserValidation";
import {
  loginUserCtrl,
  logoutUserCtrl,
  refreshSessionCtrl,
  registerUserCtrl,
} from "../controllers/auth";
import { loginUserSchema } from "../validators/auth/loginUserValidation";

export const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerUserSchema),
  ctrlWrapper(registerUserCtrl)
);

authRouter.post(
  "/login",
  validate(loginUserSchema),
  ctrlWrapper(loginUserCtrl)
);

authRouter.post("/refresh", ctrlWrapper(refreshSessionCtrl));

authRouter.post("/logout", ctrlWrapper(logoutUserCtrl));
