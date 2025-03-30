import mongoose from "mongoose";
import { env } from "../utils/env";
import createHttpError from "http-errors";
import { DB } from "../types/db.enum";

export const initDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${env(DB.DB_USER_NAME)}:${env(DB.DB_PASSWORD)}@${env(
        DB.DB_URL
      )}/${env(DB.DB_NAME)}?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("MongoDB is established successfully");
  } catch (err) {
    throw createHttpError(500, `Failed to establish MongoDB: ${err}`);
  }
};
