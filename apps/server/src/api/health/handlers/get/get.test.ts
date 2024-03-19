import request from "supertest";
import { server } from "@/app";

describe("GET /health", () => {
  it("should return a 200", async () => {
    const response = await request(server).get("/health");

    expect(response.status).toBe(200);
  });
});
