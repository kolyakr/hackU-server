import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);

  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      errors: Object.values(err),
    });
  }

  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
