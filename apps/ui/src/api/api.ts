import { SERVER_URL } from "@/environment";
import {
  GetDeploymentListParams,
  GetDeploymentListResponse,
  GetProjectListParams,
  GetProjectListResponse,
} from "./types";

const baseUrl = SERVER_URL;

const api = {
  getProjectList: ({ token }: GetProjectListParams) => {
    return fetch(`${baseUrl}/projects?token=${token}`).then((res) =>
      res.json()
    ) as Promise<GetProjectListResponse>;
  },
  getDeploymentList: ({
    token,
    deploymentCount,
    projectId,
    serviceId,
  }: GetDeploymentListParams) => {
    const query = new URLSearchParams({
      token,
      projectId,
      serviceId,
    });

    if (deploymentCount) {
      query.set("deploymentCount", deploymentCount.toString());
    }

    return fetch(`${baseUrl}/deployments?${query.toString()}`).then((res) =>
      res.json()
    ) as Promise<GetDeploymentListResponse>;
  },
};

export default api;
