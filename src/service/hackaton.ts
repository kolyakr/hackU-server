import { Types } from "mongoose";
import { Hackaton } from "../db/models/Hackaton";

export const getHackatons = async () => {
  return await Hackaton.find({});
};

export const getHackatonById = async (id: Types.ObjectId) => {
  return await Hackaton.findOne({ _id: id });
};
