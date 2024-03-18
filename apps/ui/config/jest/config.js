module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  rootDir: "../../",
  testMatch: ["<rootDir>/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setup.js"],
  moduleNameMapper: {
    "^@/test-helpers$": "<rootDir>/config/jest/helpers.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.css$": "identity-obj-proxy",
  },
  globals: {
    __IS_PRODUCTION__: false,
  },
  collectCoverage: true,
  coverageReporters: ["html"],
};
