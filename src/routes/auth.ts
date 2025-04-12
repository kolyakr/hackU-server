import { Router } from "express";
import {
  loginController,
  profileController,
  registerController,
} from "../controllers/auth";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/profile", profileController);

export { authRouter };
