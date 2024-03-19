import request from "supertest";
import { server } from "@/app";

describe("GET /deployments", () => {
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
      const response = await request(server).get("/deployments");
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
      const response = await request(server).get("/deployments?token=");
      const body = response.body;

      expect(response.status).toBe(400);
      expect(body).toEqual({
        type: "ValidationError",
        message: '"token" is not allowed to be empty',
      });
    });
  });

  describe("when the projectId is missing", () => {
    it("should return a 400", async () => {
      const response = await request(server).get(
        "/deployments?token=test-token"
      );
      const body = response.body;

      expect(response.status).toBe(400);
      expect(body).toEqual({
        type: "ValidationError",
        message: '"projectId" is required',
      });
    });
  });

  describe("when the projectId is an empty string", () => {
    it("should return a 400", async () => {
      const response = await request(server).get(
        "/deployments?token=test-token&projectId="
      );
      const body = response.body;

      expect(response.status).toBe(400);
      expect(body).toEqual({
        type: "ValidationError",
        message: '"projectId" is not allowed to be empty',
      });
    });
  });

  describe("when the serviceId is missing", () => {
    it("should return a 400", async () => {
      const response = await request(server).get(
        "/deployments?token=test-token&projectId=456"
      );
      const body = response.body;

      expect(response.status).toBe(400);
      expect(body).toEqual({
        type: "ValidationError",
        message: '"serviceId" is required',
      });
    });
  });

  describe("when the serviceId is an empty string", () => {
    it("should return a 400", async () => {
      const response = await request(server).get(
        "/deployments?token=test-token&projectId=456&serviceId="
      );
      const body = response.body;

      expect(response.status).toBe(400);
      expect(body).toEqual({
        type: "ValidationError",
        message: '"serviceId" is not allowed to be empty',
      });
    });
  });

  describe("when the deploymentCount is missing", () => {
    it("should default to 4", async () => {
      await request(server).get(
        "/deployments?token=test-token&projectId=456&serviceId=789"
      );

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("deployments( first: 4"),
        })
      );
    });

    it("should return a 200", async () => {
      const response = await request(server).get(
        "/deployments?token=test-token&projectId=456&serviceId=789"
      );
      const body = response.body;

      expect(response.status).toBe(200);
      expect(body).toEqual({
        data: {
          mock: "data",
        },
      });
    });
  });

  describe("when all required parameters are present", () => {
    it("should return a 200", async () => {
      const response = await request(server).get(
        "/deployments?token=test-token&projectId=456&serviceId=789&deploymentCount=10"
      );
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
    await request(server).get(
      "/deployments?token=test-token&projectId=456&serviceId=789&deploymentCount=10"
    );

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      "test-railway-api-url",
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
      const response = await request(server).get(
        "/deployments?token=test-token&projectId=456&serviceId=789&deploymentCount=10"
      );
      const body = response.body;

      expect(response.status).toBe(500);
      expect(body).toEqual({
        type: "FetchRailwayApiError",
        message:
          'Failed to fetch "deployments" from Railway API: Something went wrong',
      });
    });
  });
});
