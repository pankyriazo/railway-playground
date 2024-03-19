import { Request, Response } from "express";
import Joi from "joi";
import { Projects } from "@monorepo/types";
import query from "./query";
import { FetchRailwayApiError, ValidationError } from "@/types/errors";

const apiUrl = process.env.RAILWAY_API_URL;

const schema = Joi.object({
  token: Joi.string().not().empty().required(),
});
const handler = async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    const { status, type, message } = new ValidationError(
      error.details[0]?.message ?? "Invalid request"
    );

    res.status(status).json({
      type,
      message,
    });

    return;
  }

  const { token } = value;

  fetch(apiUrl, {
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
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      const { status, type, message } = new FetchRailwayApiError(
        "projects",
        error.message
      );

      res.status(status).json({
        type,
        message,
      });
    });
};

export default handler;
