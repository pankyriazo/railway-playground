import { GetProjectListResponse } from "@/api/types";

export const mockGetProjectList = {
  data: {
    me: {
      projects: {
        edges: [
          {
            node: {
              id: "a20a0d44-a6de-4804-acf1-58d436570fd7",
              name: "nauseating-cup",
              services: {
                edges: [
                  {
                    node: {
                      id: "0e62e7bf-2008-4452-bd32-e57cec3bb9a2",
                      name: "fascinated-motion",
                    },
                  },
                  {
                    node: {
                      id: "7ab42902-aae8-47b7-9976-81496dc61834",
                      name: "Postgres",
                    },
                  },
                ],
              },
              plugins: {
                edges: [],
              },
              environments: {
                edges: [
                  {
                    node: {
                      id: "1beb4373-6b1f-43cb-8150-0e7214acea82",
                      name: "production",
                    },
                  },
                  {
                    node: {
                      id: "632da482-c5b1-4570-87af-9ea225c335cb",
                      name: "staging",
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
} as const satisfies GetProjectListResponse;

export const mockGetProjectListError = {
  data: null,
  errors: [
    {
      message: "Unauthorized",
    },
  ],
} as const satisfies GetProjectListResponse;
