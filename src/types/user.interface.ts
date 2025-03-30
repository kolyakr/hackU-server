import { Types } from "mongoose";

export type UserType = {
  id: Types.ObjectId;
  name: string;
  email: string;
  points: number;
};
