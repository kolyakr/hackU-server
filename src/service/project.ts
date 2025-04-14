import { Types } from "mongoose";
import { Project } from "../db/models/Project";
import { CreateProjectType } from "../validators/projects/createProjectValidation";
import { Hackaton } from "../db/models/Hackaton";

export const getProjects = async (userId: Types.ObjectId) => {
  const projects = await Project.find({
    userId,
  });

  const projectsResponse = await Promise.all(
    projects.map(async (pr) => {
      const hackaton = await Hackaton.findOne({
        _id: pr.hackatonId,
      });

      return {
        _id: pr._id,
        createdAt: pr.createdAt,
        status: pr.status,
        hackaton,
      };
    })
  );

  return projectsResponse;
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
    status: project.status,
    createdAt: project.createdAt,
    hackaton,
  };
};
