import { Router } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { projectsRouter } from "./project";
import { hackatonsRouter } from "./hackaton";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use(userRouter);
rootRouter.use("/projects", projectsRouter);
rootRouter.use("/hackatons", hackatonsRouter);
