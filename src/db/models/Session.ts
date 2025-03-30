import { model, Schema } from "mongoose";

const sessionSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessTokenValidUntill: {
    type: Date,
    required: true,
  },
  refreshTokenValidUntill: {
    type: Date,
    required: true,
  },
});

export const Session = model("sessions", sessionSchema);
