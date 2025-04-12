import { model, Schema, Types } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  hackatonId: {
    type: Types.ObjectId,
    ref: "Hackaton",
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
  status: {
    type: String,
    enum: ["submitted", "pending", "rejected"],
    default: "pending",
    required: true,
  },
});

export const Project = model("Project", projectSchema);
