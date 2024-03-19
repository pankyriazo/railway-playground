import request from "supertest";
import { server } from "@/app";

describe("GET /projects", () => {
  let fetchSpy: jest.SpyInstance;

  beforeAll(() => {
    fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          mock: "data",
        },
      }),
    } as any);
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  afterEach(() => {
    fetchSpy.mockClear();
  });

  describe("when the token is missing", () => {
    it("should return a 400", async () => {
      const response = await request(server).get("/projects");
      const body = response.body;

      expect(response.status).toBe(400);
      expect(body).toEqual({
        type: "ValidationError",
        message: '"token" is required',
      });
    });
  });

  describe("when the token is an empty string", () => {
    it("should return a 400", async () => {
      const response = await request(server).get("/projects?token=");
      const body = response.body;

      expect(response.status).toBe(400);
      expect(body).toEqual({
        type: "ValidationError",
        message: '"token" is not allowed to be empty',
      });
    });
  });

  describe("when token parameter is present", () => {
    it("should return a 200", async () => {
      const response = await request(server).get("/projects?token=test-token");
      const body = response.body;

      expect(response.status).toBe(200);
      expect(body).toEqual({
        data: {
          mock: "data",
        },
      });
    });
  });

  it("should make a request to the Railway API", async () => {
    await request(server).get("/projects?token=test-token");

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://backboard.railway.app/graphql/v2",
      expect.any(Object)
    );
  });

  describe("when the Railway API returns an error", () => {
    beforeAll(() => {
      fetchSpy.mockResolvedValue({
        json: jest.fn().mockRejectedValue(new Error("Something went wrong")),
      } as any);
    });

    it("should return a 500", async () => {
      const response = await request(server).get("/projects?token=test-token");
      const body = response.body;

      expect(response.status).toBe(500);
      expect(body).toEqual({
        type: "FetchRailwayApiError",
        message:
          'Failed to fetch "projects" from Railway API: Something went wrong',
      });
    });
  });
});
