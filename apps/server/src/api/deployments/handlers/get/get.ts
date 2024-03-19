import { Request, Response } from "express";
import Joi from "joi";
import { Deployments } from "@monorepo/types";
import query from "./query";
import { FetchRailwayApiError, ValidationError } from "@/types/errors";

const apiUrl = process.env.RAILWAY_API_URL;

const schema = Joi.object({
  token: Joi.string().not().empty().required(),
  projectId: Joi.string().not().empty().required(),
  serviceId: Joi.string().not().empty().required(),
  deploymentCount: Joi.number().default(4),
});
const handler = (req: Request, res: Response) => {
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

  const { token, deploymentCount, projectId, serviceId } = value;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query({
        projectId,
        serviceId,
        deploymentCount,
      }),
    }),
  })
    .then((res) => res.json() as Promise<Deployments>)
    .then((deployments) => {
      res.status(200).json(deployments);
    })
    .catch((error) => {
      const { status, type, message } = new FetchRailwayApiError(
        "deployments",
        error.message
      );

      res.status(status).json({
        type,
        message,
      });
    });
};

export default handler;
