import { Types } from "mongoose";
import { Project } from "../db/models/Project";
import { CreateProjectType } from "../validators/projects/createProjectValidation";

export const getProjects = async () => {
  return await Project.find({});
};

export const createProject = async (
  payload: CreateProjectType & { userId: Types.ObjectId }
) => {
  return await Project.create(payload);
};
