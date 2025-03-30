import { User } from "../db/models/User";

export const getUsersLeaderbord = async () => {
  return await User.find().sort({ points: "desc" });
};
