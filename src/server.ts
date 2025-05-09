import express from "express";
import pino from "pino-http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./utils/env";
import { rootRouter } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

export const startServer = () => {
  const mode = env("NODE_ENV", "DEVELOPMENT");

  const app = express();

  const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://hack-u-client-rho.vercel.app",
    "https://hack-u-client-git-master-kolyas-projects-0732d788.vercel.app",
    "https://hack-u-client-48ar45zi3-kolyas-projects-0732d788.vercel.app",
  ];

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
