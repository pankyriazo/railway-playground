export interface Error {
  type: string;
  status: number;
  message: string | undefined;
}

export interface ValidationError extends Error {
  type: "ValidationError";
  status: 400;
}

export interface FetchRailwayApiError extends Error {
  type: "FetchRailwayApiError";
  status: 500;
}
