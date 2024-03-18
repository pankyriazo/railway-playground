import { getServerUrl } from "@/environment";
import {
  GetDeploymentListParams,
  GetDeploymentListResponse,
  GetProjectListParams,
  GetProjectListResponse,
} from "./types";

const baseUrl = getServerUrl();

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
