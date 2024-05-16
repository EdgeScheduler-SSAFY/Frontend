const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { configFile: "./babel.config.jest.js" }],
  },
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
    "^@next/font/google$": "<rootDir>/__mocks__/@next/font/google.js",
  },
};
