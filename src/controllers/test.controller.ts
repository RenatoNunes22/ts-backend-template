import { Request, Response } from "express";

export const testController = (req: Request, res: Response): void => {
  res.json({ message: "Rota de teste funcional!" });
};
