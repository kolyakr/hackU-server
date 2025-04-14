import { model, Schema, Types } from "mongoose";

const projectSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  hackatonId: {
    type: Types.ObjectId,
    ref: "Hackaton",
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
  status: {
    type: String,
    enum: ["Подано", "Прийнято", "Відхилено"],
    default: "Подано",
    required: true,
  },
});

export const Project = model("Project", projectSchema);
