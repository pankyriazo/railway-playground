import { SERVER_URL } from "@/environment";

const baseUrl = SERVER_URL;

const api = {
  getProjectList: (token: string) => {
    return fetch(`${baseUrl}/projects?token=${token}`).then((res) =>
      res.json()
    );
  },
};

export default api;
