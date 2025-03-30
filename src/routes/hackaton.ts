import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import {
  getHackatonsByIdCtrl,
  getHackatonsCtrl,
} from "../controllers/hackaton";

export const hackatonsRouter = Router();

hackatonsRouter.get("/", ctrlWrapper(getHackatonsCtrl));

hackatonsRouter.get("/:hackatonId", ctrlWrapper(getHackatonsByIdCtrl));
