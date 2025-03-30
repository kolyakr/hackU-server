import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ZodSchema, z } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return next(createHttpError(400, formattedErrors));
      }

      next(createHttpError(400, "Invalid request data"));
    }
  };
