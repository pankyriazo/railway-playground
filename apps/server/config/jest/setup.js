const { enableFetchMocks } = require("jest-fetch-mock");
const { server } = require("@/app");

enableFetchMocks();

beforeAll(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({});
});

afterAll(() => {
  server.close();
});
