const { loadEnvConfig } = require("@next/env");
const nextJest = require("next/jest");

loadEnvConfig(process.env.PWD);

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
