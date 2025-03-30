import { Request, Response } from "express";
import { getHackatonById, getHackatons } from "../service/hackaton";

export const getHackatonsCtrl = async (req: Request, res: Response) => {
  const hackatons = await getHackatons();

  res.json({
    hackatons,
  });
};

export const getHackatonsByIdCtrl = async (req: Request, res: Response) => {
  const { hackatonId } = req.body;
  const hackaton = await getHackatonById(hackatonId);

  res.json({
    hackaton: hackaton,
  });
};
