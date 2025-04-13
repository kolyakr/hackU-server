import { Request, Response } from "express";
import { createProject, getProjects } from "../service/project";
import { CreateProjectType } from "../validators/projects/createProjectValidation";
import { Types } from "mongoose";

export const getProjectsCtrl = async (req: Request, res: Response) => {
  const projects = await getProjects();

  res.json({
    projects: {
      ...projects,
    },
  });
};

export const createProjectCrtl = async (req: Request, res: Response) => {
  const data: CreateProjectType & { userId: Types.ObjectId } = {
    hackatonId: req.body.hackatonId,
    userId: req.token.user_id,
  };
  const project = await createProject(data);

  res.json({
    project: project,
  });
};
