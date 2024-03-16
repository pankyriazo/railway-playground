import { SERVER_URL } from "@/environment";
import { Projects } from "@monorepo/types";

const baseUrl = SERVER_URL;

const api = {
  getProjectList: (token: string) => {
    return fetch(`${baseUrl}/projects?token=${token}`).then((res) =>
      res.json()
    ) as Promise<Projects>;
  },
};

export default api;
