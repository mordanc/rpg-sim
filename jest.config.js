module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  modulePathIgnorePatterns: ['build'],
  // This configuration factors to the trails to modules that run a few code to configure or installation the test environment before each test run
  setupFiles: [],
  // This configuration indicates the Jest to the direction to a module that runs some code to configure or installation the testing framework before than each test run
  setupFilesAfterEnv: null,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/*.ts'],
};
