import dotenv from "dotenv";
import createHttpError from "http-errors";
dotenv.config();

export const env = (value: string, defaultValue?: any) => {
  if (process.env[value]) {
    return process.env[value];
  }
  if (defaultValue) {
    return defaultValue;
  }

  throw createHttpError(500, `Value ${value} was not found in .env file`);
};
