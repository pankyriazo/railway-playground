import { Request, Response } from "express";
import Joi from "joi";
import { Deployments } from "@monorepo/types";
import query from "./query";
import { FetchRailwayApiError, ValidationError } from "@/types/errors";

const apiUrl = process.env.RAILWAY_API_URL;

const schema = Joi.object({
  token: Joi.string().required(),
  deploymentCount: Joi.number().default(4),
  projectId: Joi.string().required(),
  serviceId: Joi.string().required(),
});
const handler = async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    const { status, ...errorBody } = new ValidationError(
      error.details[0]?.message ?? "Invalid request"
    );

    return res.status(status).json(errorBody);
  }

  const { token, deploymentCount, projectId, serviceId } = value;

  const deployments = await fetch(apiUrl, {
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
    .catch((error) => {
      const { status, ...errorBody } = new FetchRailwayApiError(
        "deployments",
        error.message
      );
      return res.status(status).json(errorBody);
    });

  return res.status(200).json(deployments);
};

export default handler;
