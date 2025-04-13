import { Types } from "mongoose";
import { Project } from "../db/models/Project";
import { CreateProjectType } from "../validators/projects/createProjectValidation";
import { Hackaton } from "../db/models/Hackaton";

export const getProjects = async () => {
  return await Project.find({});
};

export const createProject = async (
  payload: CreateProjectType & { userId: Types.ObjectId }
) => {
  const project = await Project.create(payload);

  const hackaton = await Hackaton.findOne({
    _id: project.hackatonId,
  });

  return {
    _id: project._id,
    hackaton,
  };
};
