import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "/default-avatar.png",
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = model("User", userSchema);
