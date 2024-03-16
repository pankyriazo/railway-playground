export class ValidationError extends Error {
  type = "ValidationError";
  status = 400;

  constructor(message?: string) {
    super(message);
  }
}

export class FetchRailwayApiError extends Error {
  type = "FetchRailwayApiError";
  status = 500;

  constructor(resouce: string, message?: string) {
    super(`Failed to fetch ${resouce}: ${message}`);
  }
}
