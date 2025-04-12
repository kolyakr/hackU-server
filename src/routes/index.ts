import { Router } from "express";
import { projectsRouter } from "./project";
import { hackatonsRouter } from "./hackaton";
import { authRouter } from "./auth";

export const rootRouter = Router();

rootRouter.use("/projects", projectsRouter);
rootRouter.use("/hackatons", hackatonsRouter);
rootRouter.use("/auth", authRouter);
