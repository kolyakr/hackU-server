import createHttpError from "http-errors";
import { initDatabase } from "./db/db";
import { startServer } from "./server";

async function bootstrap() {
  try {
    await initDatabase();
    startServer();
  } catch (err: any) {
    throw createHttpError(500, "Failed to boostrap app: ", err);
  }
}

bootstrap();
