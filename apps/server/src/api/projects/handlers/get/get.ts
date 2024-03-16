import { Request, Response } from "express";
import Joi from "joi";
import query from "./query";

const apiUrl = process.env.RAILWAY_API_URL;

const schema = Joi.object({
  token: Joi.string().required(),
});
const handler = async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0]?.message });
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
  }).then((res) => res.json());

  return res
    .status(200)
    .json(projects.data.me.projects.edges.map((edge: any) => edge.node));
};

export default handler;
