import express from "express";
import pino from "pino-http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./utils/env";
import { rootRouter } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import fs from "fs";

export const startServer = () => {
  const admin = require("firebase-admin");

  const mode = env("NODE_ENV", "DEVELOPMENT");
  const path =
    mode == "PRODUCTION" ? "/etc/secrets/firebase.json" : "./firebase.json";

  const firebaseConfig = JSON.parse(fs.readFileSync(path, "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });

  const app = express();

  const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

  app.use(
    cors({
      origin: (origin, callback) => {
        console.log("CORS checking Origin:", origin);

        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.error("Forbidden Origin:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      optionsSuccessStatus: 204,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/", (req, res) => {
    res.json({
      result: true,
      message: "This route is runnnig successfully",
    });
  });

  app.use(rootRouter);
  app.use(errorHandler);

  const PORT = env("PORT", 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${mode} mode`);
  });
};
