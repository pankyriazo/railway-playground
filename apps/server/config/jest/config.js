module.exports = {
  verbose: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  rootDir: "../../",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  coverageReporters: ["html"],
};
