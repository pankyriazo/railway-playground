import {
  ValidationError as ValidationErrorI,
  FetchRailwayApiError as FetchRailwayApiErrorI,
} from "@monorepo/types";

export class ValidationError extends Error implements ValidationErrorI {
  type = "ValidationError" as const;
  status = 400 as const;

  constructor(message: string) {
    super(message);
  }
}

export class FetchRailwayApiError
  extends Error
  implements FetchRailwayApiErrorI
{
  type = "FetchRailwayApiError" as const;
  status = 500 as const;

  constructor(public source: string, message: string) {
    super(`Failed to fetch "${source}" from Railway API: ${message}`);
  }
}
