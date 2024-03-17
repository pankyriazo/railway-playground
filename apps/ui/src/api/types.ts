import { Deployments, Projects } from "@monorepo/types";

export type GetProjectListParams = {
  token: string;
};
export type GetProjectListResponse = Projects;

export type GetDeploymentListParams = {
  token: string;
  deploymentCount?: number;
  projectId: string;
  serviceId: string;
};
export type GetDeploymentListResponse = Deployments;
