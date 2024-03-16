import { Request, Response } from "express";
import Joi from "joi";
import {
  FetchRailwayApiError,
  Projects,
  ValidationError,
} from "@monorepo/types";
import query from "./query";

const apiUrl = process.env.RAILWAY_API_URL;

const schema = Joi.object({
  token: Joi.string().required(),
});
const handler = async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    const { status, ...errorBody } = new ValidationError(
      error.details[0]?.message
    );

    return res.status(400).json(errorBody);
  }

  const { token } = value;

  const projects = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((res) => res.json() as Promise<Projects>)
    .catch((error) => {
      const { status, ...errorBody } = new FetchRailwayApiError(
        "projects",
        error.message
      );
      return res.status(status).json(errorBody);
    });

  return res.status(200).json(projects);
};

export default handler;
