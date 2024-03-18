import { GetDeploymentListResponse } from "@/api/types";

export const mockGetDeploymentList = {
  data: {
    deployments: {
      edges: [
        {
          node: {
            id: "4b049de0-1ce0-4e81-8036-26b252e3285c",
            status: "SUCCESS",
            updatedAt: "2024-03-17T08:50:14.973Z",
            environmentId: "632da482-c5b1-4570-87af-9ea225c335cb",
          },
        },
        {
          node: {
            id: "38b68be4-f86d-4987-8c48-dee293fda404",
            status: "SUCCESS",
            updatedAt: "2024-03-16T19:41:25.747Z",
            environmentId: "1beb4373-6b1f-43cb-8150-0e7214acea82",
          },
        },
      ],
    },
  },
} as const satisfies GetDeploymentListResponse;

export const mockGetDeploymentListError = {
  data: null,
  errors: [
    {
      message: "Unauthorized",
    },
  ],
} as const satisfies GetDeploymentListResponse;
