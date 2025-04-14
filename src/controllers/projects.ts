import { Request, Response } from "express";
import { createProject, getProjects } from "../service/project";
import { CreateProjectType } from "../validators/projects/createProjectValidation";
import { Types } from "mongoose";

export const getProjectsCtrl = async (req: Request, res: Response) => {
  const userId = req.token.user_id;
  const projects = await getProjects(userId);

  res.json({
    projects,
  });
};

export const createProjectCrtl = async (req: Request, res: Response) => {
  const data: CreateProjectType & { userId: Types.ObjectId } = {
    hackatonId: req.body.hackatonId,
    userId: req.token.user_id,
  };
  const project = await createProject(data);

  console.log("PROJECT: ", project);

  res.json({
    project: project,
  });
};
