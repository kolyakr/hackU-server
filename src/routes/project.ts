import { Router } from "express";
import { validate } from "../middlewares/validate";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { createProjectCrtl, getProjectsCtrl } from "../controllers/projects";
import { createProjectSchema } from "../validators/projects/createProjectValidation";
import { authorize } from "../middlewares/authorize";

export const projectsRouter = Router();

projectsRouter.get("/", ctrlWrapper(getProjectsCtrl));

projectsRouter.post(
  "/",
  validate(createProjectSchema),
  authorize,
  ctrlWrapper(createProjectCrtl)
);
