import { Router } from "express";
import { projectsRouter } from "./project";
import { hackatonsRouter } from "./hackaton";

export const rootRouter = Router();

rootRouter.use("/projects", projectsRouter);
rootRouter.use("/hackatons", hackatonsRouter);
