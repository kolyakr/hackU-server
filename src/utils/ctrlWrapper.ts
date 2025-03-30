import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const ctrlWrapper =
  (controller: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (err) {
      const error = err instanceof Error ? err.message : "Unknown error";
      next(createHttpError(500, `${error}`));
    }
  };
