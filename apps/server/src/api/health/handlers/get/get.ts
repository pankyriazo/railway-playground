import { Request, Response } from "express";

const handler = async (_req: Request, res: Response) => {
  res.status(200).send("OK");
};

export default handler;
