module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  rootDir: "../../",
  testMatch: ["<rootDir>/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setup.js"],
  collectCoverage: true,
  coverageReporters: ["html"],
};
